#
# Copyright 2010 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""DOS configuration tools.

Library for parsing dos.yaml files and working with these in memory.
"""

from __future__ import absolute_import
from __future__ import unicode_literals

# WARNING: This file is externally viewable by our users.  All comments from
# this file will be stripped.  The docstrings will NOT.  Do not put sensitive
# information in docstrings.  If you must communicate internal information in
# this source file, please place them in comments only.

import os
import re

from googlecloudsdk.appengine._internal import six_subset

# ipaddr is py2-only, so conditionally import based on python version. See
# comments under SubnetValidator.Validate for more context.
if six_subset.PY2:
  import ipaddr  # pylint:disable=g-import-not-at-top
else:
  ipaddr = None

# pylint: disable=g-import-not-at-top
if os.environ.get('APPENGINE_RUNTIME') == 'python27':
  from google.appengine.api import appinfo
  from google.appengine.api import validation
  from google.appengine.api import yaml_builder
  from google.appengine.api import yaml_listener
  from google.appengine.api import yaml_object
else:
  from googlecloudsdk.appengine.api import appinfo
  from googlecloudsdk.appengine.api import validation
  from googlecloudsdk.appengine.api import yaml_builder
  from googlecloudsdk.appengine.api import yaml_listener
  from googlecloudsdk.appengine.api import yaml_object
# pylint: enable=g-import-not-at-top

_DESCRIPTION_REGEX = r'^.{0,499}$'

BLACKLIST = 'blacklist'
DESCRIPTION = 'description'
SUBNET = 'subnet'


class SubnetValidator(validation.Validator):
  """Checks that a subnet can be parsed and is a valid IPv4 or IPv6 subnet."""

  def Validate(self, value, unused_key=None):
    """Validates a subnet."""
    if value is None:
      raise validation.MissingAttribute('subnet must be specified')
    if not isinstance(value, six_subset.string_types):
      raise validation.ValidationError('subnet must be a string, not \'%r\'' %
                                       type(value))
    # If we're running on py3 and don't have access to the ipaddr module,
    # then the server will still do the validation on the IP address.
    if ipaddr:
      try:
        ipaddr.IPNetwork(value)
      except ValueError:
        raise validation.ValidationError(
            '%s is not a valid IPv4 or IPv6 subnet' % value)

    # Extra validation check since ipaddr accepts quad-dotted subnet masks.
    parts = value.split('/')
    if len(parts) == 2 and not re.match('^[0-9]+$', parts[1]):
      raise validation.ValidationError('Prefix length of subnet %s must be an '
                                       'integer (quad-dotted masks are not '
                                       'supported)' % value)

    return value


class MalformedDosConfiguration(Exception):
  """Configuration file for DOS API is malformed."""


class BlacklistEntry(validation.Validated):
  """A blacklist entry describes a blocked IP address or subnet."""
  ATTRIBUTES = {
      DESCRIPTION: validation.Optional(_DESCRIPTION_REGEX),
      SUBNET: SubnetValidator(),
  }


class DosInfoExternal(validation.Validated):
  """Describes the format of a dos.yaml file."""
  ATTRIBUTES = {
      appinfo.APPLICATION: validation.Optional(appinfo.APPLICATION_RE_STRING),
      BLACKLIST: validation.Optional(validation.Repeated(BlacklistEntry)),
  }


def LoadSingleDos(dos_info, open_fn=None):
  """Load a dos.yaml file or string and return a DosInfoExternal object.

  Args:
    dos_info: The contents of a dos.yaml file as a string, or an open file
      object.
    open_fn: Function for opening files. Unused.

  Returns:
    A DosInfoExternal instance which represents the contents of the parsed yaml
    file.

  Raises:
    MalformedDosConfiguration: The yaml file contains multiple blacklist
      sections.
    yaml_errors.EventError: An error occured while parsing the yaml file.
  """
  builder = yaml_object.ObjectBuilder(DosInfoExternal)
  handler = yaml_builder.BuilderHandler(builder)
  listener = yaml_listener.EventListener(handler)
  listener.Parse(dos_info)

  parsed_yaml = handler.GetResults()
  if not parsed_yaml:
    return DosInfoExternal()
  if len(parsed_yaml) > 1:
    raise MalformedDosConfiguration('Multiple blacklist: sections '
                                    'in configuration.')
  return parsed_yaml[0]
