/* Copyright (c) 2016, preview-code
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of preview-code nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*exported actualDiffs,testDiffs*/
var actualDiffs = [
  {
    file: 1,
    diff: 'diff --git a/a b/a\n' +
    'new file mode 100644\n' +
    'index 0000000..e3c0674\n' +
    '--- /dev/null\n' +
    '+++ b/a\n' +
    '@@ -0,0 +1 @@\n' +
    '+one line'
  },

  {
    file: 2,
    diff: 'diff --git a/b b/b\n' +
    'index e3c0674..ca5d643 100644\n' +
    '--- a/b\n' +
    '+++ b/b\n' +
    '@@ -1 +1,2 @@\n' +
    ' one line\n' +
    '+line two'
  },

  {
    file: 3,
    diff: 'diff --git a/c b/c\n' +
    'index ca5d643..bf475b0 100644\n' +
    '--- a/c\n' +
    '+++ b/c\n' +
    '@@ -1,2 +1,3 @@\n' +
    ' one line\n' +
    '+line inbetween\n' +
    ' line two'
  },

  {
    file: 4,
    diff: 'diff --git a/d b/d\n' +
    'index bf475b0..88afc4f 100644\n' +
    '--- a/d\n' +
    '+++ b/d\n' +
    '@@ -1,3 +1,5 @@\n' +
    ' one line\n' +
    ' line inbetween\n' +
    '+another line\n' +
    '+hello world\n' +
    ' line two'
  },

  {
    file: 5,
    diff: 'diff --git a/e b/e\n' +
    'index 88afc4f..0a96631 100644\n' +
    '--- a/e\n' +
    '+++ b/e\n' +
    '@@ -1,5 +1,5 @@\n' +
    ' one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '-hello world\n' +
    '+replace a line\n' +
    ' line two'
  },

  {
    file: 6,
    diff: 'diff --git a/f b/f\n' +
    'index 0a96631..c8f047a 100644\n' +
    '--- a/f\n' +
    '+++ b/f\n' +
    '@@ -1,5 +1,5 @@\n' +
    ' one line\n' +
    ' line inbetween\n' +
    '-another line\n' +
    ' replace a line\n' +
    '+another line\n' +
    ' line two'
  },

  {
    file: 7,
    diff: 'diff --git a/g b/g\n' +
    'index c8f047a..35cced2 100644\n' +
    '--- a/g\n' +
    '+++ b/g\n' +
    '@@ -1,5 +1,4 @@\n' +
    ' one line\n' +
    ' line inbetween\n' +
    '-replace a line\n' +
    ' another line\n' +
    ' line two'
  },

  {
    file: 8,
    diff: 'diff --git a/h b/h\n' +
    'index 35cced2..b77e78a 100644\n' +
    '--- a/h\n' +
    '+++ b/h\n' +
    '@@ -1,4 +1,3 @@\n' +
    ' one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '-line two'
  },

  {
    file: 9,
    diff: 'diff --git a/i b/i\n' +
    'index b77e78a..ba817a3 100644\n' +
    '--- a/i\n' +
    '+++ b/i\n' +
    '@@ -1,3 +1,3 @@\n' +
    '-one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '+add last'
  },

  {
    file: 10,
    diff: 'diff --git a/j b/j\n' +
    'index ba817a3..56ed89c 100644\n' +
    '--- a/j\n' +
    '+++ b/j\n' +
    '@@ -1,3 +1,2 @@\n' +
    '-line inbetween\n' +
    ' another line\n' +
    ' add last'
  },

  {
    file: 11,
    diff: 'diff --git a/k b/k\n' +
    'index 56ed89c..e69de29 100644\n' +
    '--- a/k\n' +
    '+++ b/k\n' +
    '@@ -1,2 +0,0 @@\n' +
    '-another line\n' +
    '-add last'
  },

  {
    file: 12,
    expected: [11, 12],
    diff: 'diff --git a/l b/l\n' +
    'index 4dbe2d7..4dc0b35 100644\n' +
    '--- a/l\n' +
    '+++ b/l\n' +
    '@@ -3,8 +3,6 @@ Fusce laoreet dui in lectus tempus, ut vulputate nisi porttitor.\n' +
    ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Maecenas sit amet turpis condimentum enim volutpat imperdiet.\n' +
    ' Vestibulum at sem convallis, congue erat porttitor, mattis dui.\n' +
    '-Donec scelerisque massa in dignissim egestas.\n' +
    '-Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    ' Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    ' Nulla ac justo non tellus convallis suscipit.\n' +
    '@@ -340,6 +338,8 @@ Vestibulum sed sem fermentum, tristique diam ut, aliquam mauris.\n' +
    ' Sed malesuada orci non pulvinar dictum.\n' +
    ' Etiam convallis augue nec posuere convallis.\n' +
    ' Proin molestie turpis a orci ultricies, nec porta urna fringilla.\n' +
    '+Donec scelerisque massa in dignissim egestas.\n' +
    '+Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Cras aliquet lacus eget urna sagittis hendrerit.\n' +
    ' Curabitur suscipit ipsum non mollis vestibulum.\n' +
    ' Suspendisse tempus purus ac tellus pharetra fringilla.'
  },

  {
    file: 13,
    expected: [13],
    diff: 'diff --git a/m b/m\n' +
    'index efe6276..6114b7a 100644\n' +
    '--- a/m\n' +
    '+++ b/m\n' +
    '@@ -343,3 +341,5 @@ Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '+Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '+Nulla ac justo non tellus convallis suscipit.'
  },

  {
    file: 14,
    expected: [14],
    diff: 'diff --git a/n b/n\n' +
    'index efe6276..6114b7a 100644\n' +
    '--- a/n\n' +
    '+++ b/n\n' +
    '@@ -341,5 +343,3 @@ Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.'
  },

  {
    file: 15,
    expected: [15],
    diff: 'diff --git a/a b/o\n' +
    'index efe6276..6114b7a 100644\n' +
    '--- a/a\n' +
    '+++ b/o\n' +
    '@@ -341,5 +343,3 @@ Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.'
  },
  {
    file: 16,
    expected: [16],
    diff: 'diff --git a/p /dev/null\n' +
    'index efe6276..6114b7a 100644\n' +
    '--- a/p\n' +
    '+++ /dev/null\n' +
    '@@ -341,5 +343,3 @@ Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    '-Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    '-Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    '-Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.'
  }
]

var testDiffs = [
  {
    index: '1',
    file: { name: 'a', created: true },
    diffId: '@@ -0,0 +1 @@',
    fileNameUrl: 'a',
    code: '+one line',
    beforeStart: 0,
    afterStart: 1
  },
  {
    index: '2',
    file: { name: 'b' },
    diffId: '@@ -1 +1,2 @@',
    fileNameUrl: 'b',
    code: ' one line\n' +
    '+line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '3',
    file: { name: 'c' },
    diffId: '@@ -1,2 +1,3 @@',
    fileNameUrl: 'c',
    code: ' one line\n' +
    '+line inbetween\n' +
    ' line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '4',
    file: { name: 'd' },
    diffId: '@@ -1,3 +1,5 @@',
    fileNameUrl: 'd',
    code: ' one line\n' +
    ' line inbetween\n' +
    '+another line\n' +
    '+hello world\n' +
    ' line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '5',
    file: { name: 'e' },
    diffId: '@@ -1,5 +1,5 @@',
    fileNameUrl: 'e',
    code: ' one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '-hello world\n' +
    '+replace a line\n' +
    ' line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '6',
    file: { name: 'f' },
    diffId: '@@ -1,5 +1,5 @@',
    fileNameUrl: 'f',
    code: ' one line\n' +
    ' line inbetween\n' +
    '-another line\n' +
    ' replace a line\n' +
    '+another line\n' +
    ' line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '7',
    file: { name: 'g' },
    diffId: '@@ -1,5 +1,4 @@',
    fileNameUrl: 'g',
    code: ' one line\n' +
    ' line inbetween\n' +
    '-replace a line\n' +
    ' another line\n' +
    ' line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '8',
    file: { name: 'h' },
    diffId: '@@ -1,4 +1,3 @@',
    fileNameUrl: 'h',
    code: ' one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '-line two',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '9',
    file: { name: 'i' },
    diffId: '@@ -1,3 +1,3 @@',
    fileNameUrl: 'i',
    code: '-one line\n' +
    ' line inbetween\n' +
    ' another line\n' +
    '+add last',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '10',
    file: { name: 'j' },
    diffId: '@@ -1,3 +1,2 @@',
    fileNameUrl: 'j',
    code: '-line inbetween\n' +
    ' another line\n' +
    ' add last',
    beforeStart: 1,
    afterStart: 1
  },
  {
    index: '11',
    file: { name: 'k' },
    diffId: '@@ -1,2 +0,0 @@',
    fileNameUrl: 'k',
    code: '-another line\n' +
    '-add last',
    beforeStart: 1,
    afterStart: 0
  },
  {
    index: '12',
    file: { name: 'l' },
    diffId: '@@ -3,8 +3,6 @@',
    fileNameUrl: 'l',
    code: ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Maecenas sit amet turpis condimentum enim volutpat imperdiet.\n' +
    ' Vestibulum at sem convallis, congue erat porttitor, mattis dui.\n' +
    '-Donec scelerisque massa in dignissim egestas.\n' +
    '-Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    ' Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    ' Nulla ac justo non tellus convallis suscipit.',
    beforeStart: 3,
    afterStart: 3
  },
  {
    index: '13',
    file: { name: 'l' },
    diffId: '@@ -340,6 +338,8 @@',
    fileNameUrl: 'l',
    code: ' Sed malesuada orci non pulvinar dictum.\n' +
    ' Etiam convallis augue nec posuere convallis.\n' +
    ' Proin molestie turpis a orci ultricies, nec porta urna fringilla.\n' +
    '+Donec scelerisque massa in dignissim egestas.\n' +
    '+Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Cras aliquet lacus eget urna sagittis hendrerit.\n' +
    ' Curabitur suscipit ipsum non mollis vestibulum.\n' +
    ' Suspendisse tempus purus ac tellus pharetra fringilla.',
    beforeStart: 340,
    afterStart: 338
  },
  {
    index: '14',
    file: { name: 'm' },
    diffId: '@@ -343,3 +341,5 @@',
    fileNameUrl: 'm',
    code: ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '+Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '+Nulla ac justo non tellus convallis suscipit.',
    beforeStart: 343,
    afterStart: 341
  },
  {
    index: '15',
    file: { name: 'n' },
    diffId: '@@ -341,5 +343,3 @@',
    fileNameUrl: 'n',
    code: ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.',
    beforeStart: 341,
    afterStart: 343
  },
  {
    index: '16',
    file: { name: 'o', moved: true, from: 'a' },
    diffId: '@@ -341,5 +343,3 @@',
    fileNameUrl: 'fromatoo',
    code: ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.',
    beforeStart: 341,
    afterStart: 343
  }
];

var testDiffsWithDelete = testDiffs.slice();
testDiffsWithDelete.push({
  index: '17',
  file: { name: 'p', deleted: true },
  diffId: '@@ -341,5 +343,3 @@',
  fileNameUrl: 'p',
  code: '-Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
  '-Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
  '-Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
  '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
  '-Nulla ac justo non tellus convallis suscipit.',
  beforeStart: 341,
  afterStart: 343
});
