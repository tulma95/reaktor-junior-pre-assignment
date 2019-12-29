const { parseDescription, parseDependencies, parseName } = require('../backend/utils/parseFile')

const pack =
  `
Package: memtest86+
Status: install ok installed
Priority: optional
Section: misc
Installed-Size: 2404
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Version: 4.20-1.1ubuntu1
Depends: debconf (>= 0.5) | debconf-2.0
Suggests: hwtools, memtester, kernel-patch-badram, memtest86, grub-pc | grub-legacy, mtools
Conffiles:
 /etc/grub.d/20_memtest86+ 6dc48efccb95680ab07349956a48fef3
Description: thorough real-mode memory tester
 Memtest86+ scans your RAM for errors.
 .
 This tester runs independently of any OS - it is run at computer
 boot-up, so that it can test *all* of your memory.  You may want to
 look at \`memtester', which allows to test your memory within Linux,
 but this one won't be able to test your whole RAM.
 .
 It can output a list of bad RAM regions usable by the BadRAM kernel
 patch, so that you can still use your old RAM with one or two bad bits.
 .
 Memtest86+ is based on memtest86 3.0, and adds support for recent
 hardware, as well as a number of general-purpose improvements,
 including many patches to memtest86 available from various sources.
 .
 Both memtest86 and memtest86+ are being worked on in parallel.
Homepage: http://www.memtest.org/
Original-Maintainer: Yann Dirson <dirson@debian.org>
`

describe('description', () => {
  test('is right with single pack', () => {
    const description =
      `thorough real-mode memory tester
 Memtest86+ scans your RAM for errors.
 .
 This tester runs independently of any OS - it is run at computer
 boot-up, so that it can test *all* of your memory.  You may want to
 look at \`memtester', which allows to test your memory within Linux,
 but this one won't be able to test your whole RAM.
 .
 It can output a list of bad RAM regions usable by the BadRAM kernel
 patch, so that you can still use your old RAM with one or two bad bits.
 .
 Memtest86+ is based on memtest86 3.0, and adds support for recent
 hardware, as well as a number of general-purpose improvements,
 including many patches to memtest86 available from various sources.
 .
 Both memtest86 and memtest86+ are being worked on in parallel.
`
    expect(parseDescription(pack)).toMatch(description)
  })

  test('is right when description is last package attribute', () => {
    const testPack =
      `Package: libxau6
Status: install ok installed
Multi-Arch: same
Priority: optional
Section: libs
Installed-Size: 54
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: libxau
Version: 1:1.0.6-4
Depends: libc6 (>= 2.4)
Pre-Depends: multiarch-support
Description: X11 authorisation library
 This package provides the main interface to the X11 authorisation handling,
 which controls authorisation for X connections, both client-side and
 server-side.
 .
 More information about X.Org can be found at:
 <URL:http://www.X.org>
 .
 This module can be found at
 git://anongit.freedesktop.org/git/xorg/lib/libXau
`
    const expectedDesc =
      `X11 authorisation library
 This package provides the main interface to the X11 authorisation handling,
 which controls authorisation for X connections, both client-side and
 server-side.
 .
 More information about X.Org can be found at:
 <URL:http://www.X.org>
 .
 This module can be found at
 git://anongit.freedesktop.org/git/xorg/lib/libXau
`
    expect(parseDescription(testPack)).toMatch(expectedDesc)

  })
})

test('description is right with single pack', () => {
  const description =
    `thorough real-mode memory tester
 Memtest86+ scans your RAM for errors.
 .
 This tester runs independently of any OS - it is run at computer
 boot-up, so that it can test *all* of your memory.  You may want to
 look at \`memtester', which allows to test your memory within Linux,
 but this one won't be able to test your whole RAM.
 .
 It can output a list of bad RAM regions usable by the BadRAM kernel
 patch, so that you can still use your old RAM with one or two bad bits.
 .
 Memtest86+ is based on memtest86 3.0, and adds support for recent
 hardware, as well as a number of general-purpose improvements,
 including many patches to memtest86 available from various sources.
 .
 Both memtest86 and memtest86+ are being worked on in parallel.
`
  expect(parseDescription(pack)).toMatch(description)
})

test('package dependencies version numbers are removed', () => {
  const dependencies = `debconf | debconf-2.0`

  expect(parseDependencies(pack)).toContain(dependencies)
})

test('name is right with single pack', () => {
  const name = 'memtest86+'
  expect(parseName(pack)).toMatch(name)
})