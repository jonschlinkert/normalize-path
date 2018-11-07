# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Changelog

## [3.0.0]

No breaking changes.

### Added

* Ensuring that [win32 namespaces](https://msdn.microsoft.com/library/windows/desktop/aa365247(v=vs.85).aspx#namespaces)
  has two leading slashes, so that the path is handled properly by the win32
  version of path.parse() after being normalized.
* Making sure a single forward slash is returned in cases like: "\\", "/" in
  spite of the above change.
* Other various testing 

### Changed

* Various updates to tooling
* Benchmark refactors

### Removed

* Removed the `remove-trailing-separator` dependency
