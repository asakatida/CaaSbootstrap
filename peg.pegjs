// Hierarchical syntax
Grammar
  = grammar:(Spacing Definition+ EndOfFile) {
    return {
      'type': 'Grammar',
      'children': grammar,
      'offset': location().start.offset
    }
  }
Definition
  = definition:(Identifier LEFTARROW Expression) {
    return {
      'type': 'Definition',
      'children': definition,
      'offset': location().start.offset
    }
  }
Expression
  = expression:(Sequence (SLASH Sequence)*) {
    return {
      'type': 'Expression',
      'children': expression,
      'offset': location().start.offset
    }
  }
Sequence
  = prefix:Prefix* {
    return {
      'type': 'Sequence',
      'children': prefix,
      'offset': location().start.offset
    }
  }
Prefix
  = prefix:(AND / NOT)? suffix:Suffix {
    return {
      'type': 'Prefix',
      'children': prefix ? [prefix, suffix] : [suffix],
      'offset': location().start.offset
    }
  }
Suffix
  = primary:Primary suffix:(QUESTION / STAR / PLUS)? {
    return {
      'type': 'Suffix',
      'children': suffix ? [primary, suffix] : [primary],
      'offset': location().start.offset
    }
  }
Primary
  = primary:(identifier:Identifier !LEFTARROW { return identifier }
  / OPEN Expression CLOSE / Literal / Class / DOT) {
    return {
      'type': 'Primary',
      'children': primary instanceof Array ? primary : [primary],
      'offset': location().start.offset
    }
  }
// Lexical syntax
Identifier
  = identifier:(IdentStart IdentCont* Spacing) {
    return {
      'type': 'Identifier',
      'children': identifier,
      'offset': location().start.offset
    }
  }
IdentStart
  = identstart:[a-z_]i {
    return {
      'type': 'IdentStart',
      'children': [identstart],
      'offset': location().start.offset
    }
  }
IdentCont
  = identcont:(IdentStart / [0-9]) {
    return {
      'type': 'IdentCont',
      'children': [identcont],
      'offset': location().start.offset
    }
  }
Literal
  = literal:(
    ['] (!['] char:Char { return char })* ['] Spacing
    / ["] (!["] char:Char { return char })* ["] Spacing) {
    return {
      'type': 'Literal',
      'children': literal,
      'offset': location().start.offset
    }
  }
Class
  = cls:('[' (!']' range:Range { return range })* ']' Spacing) {
    return {
      'type': 'Class',
      'children': cls,
      'offset': location().start.offset
    }
  }
Range
  = range:(Char '-' Char / Char) {
    return {
      'type': 'Range',
      'children': range instanceof Array ? range : [range],
      'offset': location().start.offset
    }
  }
Char
  = ('\\' [nrt'"\[\]\\] / '\\' [0-2][0-7][0-7] / '\\' [0-7][0-7]? / !'\\' .) {
    return {
      'type': 'Char',
      'children': [text()],
      'offset': location().start.offset
    }
  }
LEFTARROW
  = leftarrow:('<-' Spacing) {
    return {
      'type': 'LEFTARROW',
      'children': leftarrow,
      'offset': location().start.offset
    }
  }
SLASH
  = slash:('/' Spacing) {
    return {
      'type': 'SLASH',
      'children': slash,
      'offset': location().start.offset
    }
  }
AND
  = and:('&' Spacing) {
    return {
      'type': 'AND',
      'children': and,
      'offset': location().start.offset
    }
  }
NOT
  = not:('!' Spacing) {
    return {
      'type': 'NOT',
      'children': not,
      'offset': location().start.offset
    }
  }
QUESTION
  = question:('?' Spacing) {
    return {
      'type': 'QUESTION',
      'children': question,
      'offset': location().start.offset
    }
  }
STAR
  = star:('*' Spacing) {
    return {
      'type': 'STAR',
      'children': star,
      'offset': location().start.offset
    }
  }
PLUS
  = plus:('+' Spacing) {
    return {
      'type': 'PLUS',
      'children': plus,
      'offset': location().start.offset
    }
  }
OPEN
  = open:('(' Spacing) {
    return {
      'type': 'OPEN',
      'children': open,
      'offset': location().start.offset
    }
  }
CLOSE
  = close:(')' Spacing) {
    return {
      'type': 'CLOSE',
      'children': close,
      'offset': location().start.offset
    }
  }
DOT
  = dot:('.' Spacing) {
    return {
      'type': 'DOT',
      'children': dot,
      'offset': location().start.offset
    }
  }
Spacing
  = spacing:(Space / Comment)* {
    return {
      'type': 'Spacing',
      'children': spacing,
      'offset': location().start.offset
    }
  }
Comment
  = comment:('#' (!EndOfLine dot:. { return dot })* EndOfLine) {
    return {
      'type': 'Comment',
      'children': comment,
      'offset': location().start.offset
    }
  }
Space
  = space:(' ' / '\t' / EndOfLine) {
    return {
      'type': 'Space',
      'children': [space],
      'offset': location().start.offset
    }
  }
EndOfLine
  = endofline:('\r\n' / '\n' / '\r') {
    return {
      'type': 'EndOfLine',
      'children': [endofline],
      'offset': location().start.offset
    }
  }
EndOfFile
  = !. {
    return {
      'type': 'EndOfFile',
      'children': [],
      'offset': location().start.offset
    }
  }
