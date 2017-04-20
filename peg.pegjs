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
  = fields:(Spacing Definition+ EndOfFile) {
    return {
      type: 'Grammar',
      fields: fields
    };
  }
Definition
  = fields:(Identifier LEFTARROW Expression) {
    return {
      type: 'Definition',
      fields: fields
    };
  }
Expression
  = fields:(Sequence (SLASH Sequence)*) {
    return {
      type: 'Expression',
      fields: fields
    };
  }
Sequence
  = fields:(Prefix*) {
    return {
      type: 'Sequence',
      fields: fields
    };
  }
Prefix
  = fields:((AND / NOT)? Suffix) {
    return {
      type: 'Prefix',
      fields: fields
    };
  }
Suffix
  = fields:(Primary (QUESTION / STAR / PLUS)?) {
    return {
      type: 'Suffix',
      fields: fields
    };
  }
Primary
  = fields:(Identifier !LEFTARROW / OPEN Expression CLOSE / Literal / Class / DOT) {
    return {
      type: 'Primary',
      fields: fields
    };
  }
// Lexical syntax
Identifier
  = fields:(IdentStart IdentCont* Spacing) {
    return {
      type: 'Identifier',
      fields: fields
    };
  }
IdentStart
  = [a-z_]i {
    return {
      type: 'IdentStart',
      fields: makeText()
    };
  }
IdentCont
  = fields:(IdentStart / [0-9] { return makeText(); }) {
    return {
      type: 'IdentCont',
      fields: fields
    };
  }
Literal
  = fields:((['] { return makeText(); }) (!['] Char)* (['] { return makeText(); }) Spacing / (["] { return makeText(); }) (!["] Char)* (["] { return makeText(); }) Spacing) {
    return {
      type: 'Literal',
      fields: fields
    };
  }
Class
  = fields:(('[' { return makeText(); }) (!']' Range)* (']' { return makeText(); }) Spacing) {
    return {
      type: 'Class',
      fields: fields
    };
  }
Range
  = fields:(Char ('-' { return makeText(); }) Char / Char) {
    return {
      type: 'Range',
      fields: fields
    };
  }
Char
  = ('\\' [nrt'"\[\]\\] / '\\' [0-2][0-7][0-7] / '\\' [0-7][0-7]? / !'\\' .) {
    return {
      type: 'Char',
      fields: makeText()
    };
  }
LEFTARROW
  = fields:(('<-' { return makeText(); }) Spacing) {
    return {
      type: 'LEFTARROW',
      fields: fields
    };
  }
SLASH
  = fields:(('/' { return makeText(); }) Spacing) {
    return {
      type: 'SLASH',
      fields: fields
    };
  }
AND
  = fields:('&' { return makeText(); }) Spacing {
    return {
      type: 'AND',
      fields: fields
    };
  }
NOT
  = fields:('!' { return makeText(); }) Spacing {
    return {
      type: 'NOT',
      fields: fields
    };
  }
QUESTION
  = fields:('?' { return makeText(); }) Spacing {
    return {
      type: 'QUESTION',
      fields: fields
    };
  }
STAR
  = fields:('*' { return makeText(); }) Spacing {
    return {
      type: 'STAR',
      fields: fields
    };
  }
PLUS
  = fields:('+' { return makeText(); }) Spacing {
    return {
      type: 'PLUS',
      fields: fields
    };
  }
OPEN
  = fields:('(' { return makeText(); }) Spacing {
    return {
      type: 'OPEN',
      fields: fields
    };
  }
CLOSE
  = fields:(')' { return makeText(); }) Spacing {
    return {
      type: 'CLOSE',
      fields: fields
    };
  }
DOT
  = fields:('.' { return makeText(); }) Spacing {
    return {
      type: 'DOT',
      fields: fields
    };
  }
Spacing
  = fields:(Space / Comment)* {
    return {
      type: 'Spacing',
      fields: fields
    };
  }
Comment
  = fields:(('#' { return makeText(); }) (!EndOfLine . { return makeText(); })* EndOfLine) {
    return {
      type: 'Comment',
      fields: fields
    };
  }
Space
  = fields:((' ' / '\t') { return makeText(); } / EndOfLine) {
    return {
      type: 'Space',
      fields: fields
    };
  }
EndOfLine
  = ('\r\n' / '\n' / '\r') {
    return {
      type: 'EndOfLine',
      fields: makeText()
    };
  }
EndOfFile
  = !. {
    return {
      type: 'EndOfFile',
    };
  }
