#!/usr/bin/env python

from distutils.core import setup

setup(name='lanbo',
    version='0.1',
    description='Library to interface with L293D motor controller',
    author='Eric Wong',
    url='https://github.com/etdub/lanbo',
    packages=['lanbo'],
    scripts=['bin/run_lanboweb.py']
    )
