/* Copyright (c) 2016, preview-code
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of rite-evaluation nor the names of its
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
    diff: 'diff --git a/a b/a\n' +
          'index e3c0674..ca5d643 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1 +1,2 @@\n' +
          ' one line\n' +
          '+line two'
  },

  {
    file: 3,
    diff: 'diff --git a/a b/a\n' +
          'index ca5d643..bf475b0 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,2 +1,3 @@\n' +
          ' one line\n' +
          '+line inbetween\n' +
          ' line two'
  },

  {
    file: 4,
    diff: 'diff --git a/a b/a\n' +
          'index bf475b0..88afc4f 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,3 +1,5 @@\n' +
          ' one line\n' +
          ' line inbetween\n' +
          '+another line\n' +
          '+hello world\n' +
          ' line two'
  },

  {
    file: 5,
    diff: 'diff --git a/a b/a\n' +
          'index 88afc4f..0a96631 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
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
    diff: 'diff --git a/b b/b\n' +
          'index 0a96631..c8f047a 100644\n' +
          '--- a/b\n' +
          '+++ b/b\n' +
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
    diff: 'diff --git a/a b/a\n' +
          'index c8f047a..35cced2 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,5 +1,4 @@\n' +
          ' one line\n' +
          ' line inbetween\n' +
          '-replace a line\n' +
          ' another line\n' +
          ' line two'
  },

  {
    file: 8,
    diff: 'diff --git a/a b/a\n' +
          'index 35cced2..b77e78a 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,4 +1,3 @@\n' +
          ' one line\n' +
          ' line inbetween\n' +
          ' another line\n' +
          '-line two'
  },

  {
    file: 9,
    diff: 'diff --git a/a b/a\n' +
          'index b77e78a..ba817a3 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,3 +1,3 @@\n' +
          '-one line\n' +
          ' line inbetween\n' +
          ' another line\n' +
          '+add last'
  },

  {
    file: 10,
    diff: 'diff --git a/a b/a\n' +
          'index ba817a3..56ed89c 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,3 +1,2 @@\n' +
          '-line inbetween\n' +
          ' another line\n' +
          ' add last'
  },

  {
    file: 11,
    diff: 'diff --git a/a b/a\n' +
          'index 56ed89c..e69de29 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
          '@@ -1,2 +0,0 @@\n' +
          '-another line\n' +
          '-add last'
  },

  {
    file: 12,
    expected: [11, 12],
    diff: 'diff --git a/a b/a\n' +
          'index 4dbe2d7..4dc0b35 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
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
    diff: 'diff --git a/a b/a\n' +
          'index efe6276..6114b7a 100644\n' +
          '--- a/a\n' +
          '+++ b/a\n' +
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
    diff: 'diff --git a/a b/a\n' +
    'index efe6276..6114b7a 100644\n' +
    '--- a/a\n' +
    '+++ b/a\n' +
    '@@ -341,5 +343,3 @@ Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Pellentesque a nulla a libero molestie blandit vitae id eros.\n' +
    ' Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Integer non turpis eu quam bibendum pulvinar vel non ante.\n' +
    '-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n' +
    '-Nulla ac justo non tellus convallis suscipit.'
  }
]

var testDiffs = [
  {
    index: '1',
    file: {name: 'a', created: true},
    diffId: '@@ -0,0 +1 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n+one line",
    linesChanged: { startLineBefore: 0, rangeBefore: 0,
      startLineAfter: 1,  rangeAfter: 1 }
  },
  {
    index: '2',
    file: {name: 'a'},
    diffId: '@@ -1 +1,2 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    "+line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 1,
      startLineAfter: 1,  rangeAfter: 2 }
  },
  {
    index: '3',
    file: {name: 'a'},
    diffId: '@@ -1,2 +1,3 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    "+line inbetween\n" +
    " line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 2,
      startLineAfter: 1,  rangeAfter: 3 }
  },
  {
    index: '4',
    file: {name: 'a'},
    diffId: '@@ -1,3 +1,5 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    " line inbetween\n" +
    "+another line\n" +
    "+hello world\n" +
    " line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 3,
      startLineAfter: 1,  rangeAfter: 5 }
  },
  {
    index: '5',
    file: {name: 'a'},
    diffId: '@@ -1,5 +1,5 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    " line inbetween\n" +
    " another line\n" +
    "-hello world\n" +
    "+replace a line\n" +
    " line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 5,
      startLineAfter: 1,  rangeAfter: 5 }
  },
  {
    index: '6',
    file: {name: 'b'},
    diffId: '@@ -1,5 +1,5 @@',
    fileUrl: 'base/blob/sha/b',
    changes: "\n one line\n" +
    " line inbetween\n" +
    "-another line\n" +
    " replace a line\n" +
    "+another line\n" +
    " line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 5,
      startLineAfter: 1,  rangeAfter: 5 }
  },
  {
    index: '7',
    file: {name: 'a'},
    diffId: '@@ -1,5 +1,4 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    " line inbetween\n" +
    "-replace a line\n" +
    " another line\n" +
    " line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 5,
      startLineAfter: 1,  rangeAfter: 4 }
  },
  {
    index: '8',
    file: {name: 'a'},
    diffId: '@@ -1,4 +1,3 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n one line\n" +
    " line inbetween\n" +
    " another line\n" +
    "-line two",
    linesChanged: { startLineBefore: 1, rangeBefore: 4,
      startLineAfter: 1,  rangeAfter: 3 }
  },
  {
    index: '9',
    file: {name: 'a'},
    diffId: '@@ -1,3 +1,3 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n-one line\n" +
    " line inbetween\n" +
    " another line\n" +
    "+add last",
    linesChanged: { startLineBefore: 1, rangeBefore: 3,
      startLineAfter: 1,  rangeAfter: 3 }
  },
  {
    index: '10',
    file: {name: 'a'},
    diffId: '@@ -1,3 +1,2 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n-line inbetween\n" +
    " another line\n" +
    " add last",
    linesChanged: { startLineBefore: 1, rangeBefore: 3,
      startLineAfter: 1,  rangeAfter: 2 }
  },
  {
    index: '11',
    file: {name: 'a'},
    diffId: '@@ -1,2 +0,0 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n-another line\n" +
    "-add last",
    linesChanged: { startLineBefore: 1, rangeBefore: 2,
      startLineAfter: 0,  rangeAfter: 0 }
  },
  {
    index: '12',
    file: {name: 'a'},
    diffId: '@@ -3,8 +3,6 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n Pellentesque a nulla a libero molestie blandit vitae id eros.\n" +
    " Maecenas sit amet turpis condimentum enim volutpat imperdiet.\n" +
    " Vestibulum at sem convallis, congue erat porttitor, mattis dui.\n" +
    "-Donec scelerisque massa in dignissim egestas.\n" +
    "-Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n" +
    " Integer non turpis eu quam bibendum pulvinar vel non ante.\n" +
    " Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n" +
    " Nulla ac justo non tellus convallis suscipit.",
    linesChanged: { startLineBefore: 3, rangeBefore: 8,
      startLineAfter: 3,  rangeAfter: 6 }
  },
  {
    index: '13',
    file: {name: 'a'},
    diffId: '@@ -340,6 +338,8 @@',
    fileUrl: 'base/blob/sha/a',
    changes: '\n Sed malesuada orci non pulvinar dictum.\n' +
    ' Etiam convallis augue nec posuere convallis.\n' +
    ' Proin molestie turpis a orci ultricies, nec porta urna fringilla.\n' +
    '+Donec scelerisque massa in dignissim egestas.\n' +
    '+Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n' +
    ' Cras aliquet lacus eget urna sagittis hendrerit.\n' +
    ' Curabitur suscipit ipsum non mollis vestibulum.\n' +
    ' Suspendisse tempus purus ac tellus pharetra fringilla.',
    linesChanged: { startLineBefore: 340, rangeBefore: 6,
      startLineAfter: 338,  rangeAfter: 8 }
  },
  {
    index: '14',
    file: {name: 'a'},
    diffId: '@@ -343,3 +341,5 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n Pellentesque a nulla a libero molestie blandit vitae id eros.\n" +
    " Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n" +
    " Integer non turpis eu quam bibendum pulvinar vel non ante.\n" +
    "+Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n" +
    "+Nulla ac justo non tellus convallis suscipit.",
    linesChanged: { startLineBefore: 343, rangeBefore: 3,
      startLineAfter: 341,  rangeAfter: 5 }
  },
  {
    index: '15',
    file: {name: 'a'},
    diffId: '@@ -341,5 +343,3 @@',
    fileUrl: 'base/blob/sha/a',
    changes: "\n Pellentesque a nulla a libero molestie blandit vitae id eros.\n" +
    " Morbi fermentum neque sit amet ante eleifend, non molestie nulla pretium.\n" +
    " Integer non turpis eu quam bibendum pulvinar vel non ante.\n" +
    "-Etiam vel nibh aliquam, dignissim nunc vel, ultrices sapien.\n" +
    "-Nulla ac justo non tellus convallis suscipit.",
    linesChanged: { startLineBefore: 341, rangeBefore: 5,
      startLineAfter: 343,  rangeAfter: 3 }
  }
];
