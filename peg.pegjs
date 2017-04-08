{
  function makeText() {
    return {
      type: 'Text',
      text: text(),
      offset: location().start.offset
    };
  }
}

// Hierarchical syntax
Grammar
  = spacing:Spacing definitions:Definition+ endoffile:EndOfFile {
    return {
      type: 'Grammar',
      spacing: spacing,
      definitions: definitions,
      endoffile: endoffile,
    };
  }
Definition
  = identifier:Identifier leftarrow:LEFTARROW expression:Expression {
    return {
      type: 'Definition',
      identifier: identifier,
      leftarrow: leftarrow,
      expression: expression
    };
  }
Expression
  = first:Sequence alternates:(slash:SLASH sequence:Sequence {
    return {
      slash: slash,
      sequence: sequence
    };
  })* {
    return {
      type: 'Expression',
      sequence: first,
      alternates: alternates
    };
  }
Sequence
  = prefixes:Prefix* {
    return {
      type: 'Sequence',
      prefixes: prefixes
    };
  }
Prefix
  = prefix:(AND / NOT)? suffix:Suffix {
    if (prefix) {
      return {
        type: 'Prefix',
        prefix: prefix,
        suffix: suffix
      };
    }
    return {
      type: 'Prefix',
      suffix: suffix
    };
  }
Suffix
  = primary:Primary suffix:(QUESTION / STAR / PLUS)? {
    if (suffix) {
      return {
        type: 'Suffix',
        primary: primary,
        suffix: suffix
      };
    }
    return {
      type: 'Suffix',
      primary: primary
    };
  }
Primary
  = identifier:Identifier !LEFTARROW {
    return {
      type: 'Primary',
      identifier: identifier
    };
  }
  / open:OPEN expression:Expression close:CLOSE {
    return {
      type: 'Primary',
      open: open,
      expression: expression,
      close: close
    };
  }
  / literal:Literal {
    return {
      type: 'Primary',
      literal: literal
    };
  }
  / cls:Class {
    return {
      type: 'Primary',
      class: cls
    };
  }
  / dot:DOT {
    return {
      type: 'Primary',
      dot: dot
    };
  }
// Lexical syntax
Identifier
  = identstart:IdentStart identconts:IdentCont* spacing:Spacing {
    return {
      type: 'Identifier',
      identstart: identstart,
      identconts: identconts,
      spacing: spacing
    };
  }
IdentStart
  = text:([a-z_]i { return makeText(); }) {
    return {
      type: 'IdentStart',
      text: text
    };
  }
IdentCont
  = identstart:IdentStart {
    return {
      type: 'IdentCont',
      identstart: identstart
    };
  }
  / [0-9] {
    return {
      type: 'IdentCont',
      text: makeText()
    };
  }
Literal
  = open:(['] { return makeText(); }) chars:(!['] char:Char { return char; })* close:(['] { return makeText(); }) spacing:Spacing
  / open:(["] { return makeText(); }) chars:(!["] char:Char { return char; })* close:(["] { return makeText(); }) spacing:Spacing {
    return {
      type: 'Literal',
      open: open,
      chars: chars,
      close: close,
      spacing: spacing
    };
  }
Class
  = open:('[' { return makeText(); }) ranges:(!']' range:Range { return range; })* close:(']' { return makeText(); }) spacing:Spacing {
    return {
      type: 'Class',
      open: open,
      ranges: ranges,
      close: close,
      spacing: spacing
    };
  }
Range
  = start:Char text:('-' { return makeText(); }) end:Char {
    return {
      type: 'Range',
      start: start,
      text: text,
      end: end
    };
  }
  / start:Char {
    return {
      type: 'Range',
      start: start
    };
  }
Char
  = '\\' [nrt'"\[\]\\] / '\\' [0-2][0-7][0-7] / '\\' [0-7][0-7]? / !'\\' . {
    return {
      type: 'Char',
      text: makeText()
    };
  }
LEFTARROW
  = text:('<-' { return makeText(); }) spacing:Spacing {
    return {
      type: 'LEFTARROW',
      text: text,
      spacing: spacing
    };
  }
SLASH
  = text:('/' { return makeText(); }) spacing:Spacing {
    return {
      type: 'SLASH',
      text: text,
      spacing: spacing
    };
  }
AND
  = text:('&' { return makeText(); }) spacing:Spacing {
    return {
      type: 'AND',
      text: text,
      spacing: spacing
    };
  }
NOT
  = text:('!' { return makeText(); }) spacing:Spacing {
    return {
      type: 'NOT',
      text: text,
      spacing: spacing
    };
  }
QUESTION
  = text:('?' { return makeText(); }) spacing:Spacing {
    return {
      type: 'QUESTION',
      text: text,
      spacing: spacing
    };
  }
STAR
  = text:('*' { return makeText(); }) spacing:Spacing {
    return {
      type: 'STAR',
      text: text,
      spacing: spacing
    };
  }
PLUS
  = text:('+' { return makeText(); }) spacing:Spacing {
    return {
      type: 'PLUS',
      text: text,
      spacing: spacing
    };
  }
OPEN
  = text:('(' { return makeText(); }) spacing:Spacing {
    return {
      type: 'OPEN',
      text: text,
      spacing: spacing
    };
  }
CLOSE
  = text:(')' { return makeText(); }) spacing:Spacing {
    return {
      type: 'CLOSE',
      text: text,
      spacing: spacing
    };
  }
DOT
  = text:('.' { return makeText(); }) spacing:Spacing {
    return {
      type: 'DOT',
      text: text,
      spacing: spacing
    };
  }
Spacing
  = spaces:(Space / Comment)* {
    return {
      type: 'Spacing',
      spaces: spaces
    };
  }
Comment
  = start:('#' { return makeText(); }) content:(!EndOfLine . { return makeText(); })* endofline:EndOfLine {
    return {
      type: 'Comment',
      start: start,
      content: content,
      endofline: endofline
    };
  }
Space
  = (' ' / '\t') {
    return {
      type: 'Space',
      text: makeText()
    };
  }
  / endofline:EndOfLine {
    return {
      type: 'Space',
      endofline: endofline
    };
  }
EndOfLine
  = ('\r\n' / '\n' / '\r') {
    return {
      type: 'EndOfLine',
      endofline: makeText()
    };
  }
EndOfFile
  = !. {
    return {
      type: 'EndOfFile',
    };
  }
