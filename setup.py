#!/usr/bin/env python

import os
import re
from distutils.core import setup

package_files = []
for path, dirs, files in os.walk('lanbo/static'):
  for file in files:
    if re.search('.(gif|css|js|png|html)$', file):
      package_files.append('{0}/{1}'.format(path.replace('lanbo/', ''),file))
for path, dirs, files in os.walk('lanbo/templates'):
  for file in files:
    if re.search('.(html)$', file):
      package_files.append('{0}/{1}'.format(path.replace('lanbo/', ''),file))

setup(name='lanbo',
    version='0.2',
    description='Library to interface with L293D motor controller',
    author='Eric Wong',
    url='https://github.com/etdub/lanbo',
    packages=['lanbo'],
    scripts=['bin/run_lanboweb.py'],
    package_data = {
      'lanbo': package_files
    }
    )
