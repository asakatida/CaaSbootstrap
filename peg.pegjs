// Hierarchical syntax
Grammar
  = spacing:Spacing definition:Definition+ endoffile:EndOfFile {
    return {
      'type': 'Grammar',
      'children': [spacing].concat(definition.concat([endoffile])),
      'offset': location().start.offset
    }
  }
Definition
  = identifier:Identifier leftarrow:LEFTARROW expression:Expression {
    return {
      'type': 'Definition',
      'children': [identifier, leftarrow, expression],
      'offset': location().start.offset
    }
  }
Expression
  = sequence:Sequence sequences:(
      slash:SLASH seq:Sequence {
        return [slash, seq]
      })* {
    return {
      'type': 'Expression',
      'children': [sequence].concat([].concat.apply([], sequences)),
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
  = identifier:Identifier !LEFTARROW {
    return {
      'type': 'Primary',
      'children': [identifier],
      'offset': location().start.offset
    }
  }
  / open:OPEN expression:Expression close:CLOSE {
    return {
      'type': 'Primary',
      'children': [open, expression, close],
      'offset': location().start.offset
    }
  }
  / literal:Literal {
    return {
      'type': 'Primary',
      'children': [literal],
      'offset': location().start.offset
    }
  }
  / cls:Class {
    return {
      'type': 'Primary',
      'children': [cls],
      'offset': location().start.offset
    }
  }
  / dot:DOT {
    return {
      'type': 'Primary',
      'children': [dot],
      'offset': location().start.offset
    }
  }
// Lexical syntax
Identifier
  = identstart:IdentStart identcont:IdentCont* spacing:Spacing {
    return {
      'type': 'Identifier',
      'children': [identstart].concat(identcont.concat([spacing])),
      'offset': location().start.offset
    }
  }
IdentStart
  = [a-z_]i {
    return {
      'type': 'IdentStart',
      'children': [text()],
      'offset': location().start.offset
    }
  }
IdentCont
  = identstart:IdentStart {
    return {
      'type': 'IdentCont',
      'children': [identstart],
      'offset': location().start.offset
    }
  }
  / [0-9] {
    return {
      'type': 'IdentCont',
      'children': [text()],
      'offset': location().start.offset
    }
  }
Literal
  = open:['] chars:(
      !['] char:Char {
        return char
      })* close:['] spacing:Spacing {
    return {
      'type': 'Literal',
      'children': [open].concat(chars.concat([close, spacing])),
      'offset': location().start.offset
    }
  }
  / open:["] char:(
      !["] Char {
        return char
      })* close:["] spacing:Spacing {
    return {
      'type': 'Literal',
      'children': [open].concat(chars.concat([close, spacing])),
      'offset': location().start.offset
    }
  }
Class
  = open:'[' ranges:(
      !']' range:Range {
        return range
      })* close:']' spacing:Spacing {
    return {
      'type': 'Class',
      'children': [open].concat(ranges.concat([close, spacing])),
      'offset': location().start.offset
    }
  }
Range
  = start:Char sep:'-' end:Char {
    return {
      'type': 'Range',
      'children': [start, sep, end],
      'offset': location().start.offset
    }
  }
  / char:Char {
    return {
      'type': 'Range',
      'children': [char],
      'offset': location().start.offset
    }
  }
Char
  = '\\' [nrt'"\[\]\\] {
    return {
      'type': 'Char',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / '\\' [0-2][0-7][0-7] {
    return {
      'type': 'Char',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / '\\' [0-7][0-7]? {
    return {
      'type': 'Char',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / !'\\' . {
    return {
      'type': 'Char',
      'children': [text()],
      'offset': location().start.offset
    }
  }
LEFTARROW
  = leftarrow:'<-' spacing:Spacing {
    return {
      'type': 'LEFTARROW',
      'children': [leftarrow, spacing],
      'offset': location().start.offset
    }
  }
SLASH
  = slash:'/' spacing:Spacing {
    return {
      'type': 'SLASH',
      'children': [slash, spacing],
      'offset': location().start.offset
    }
  }
AND
  = and:'&' spacing:Spacing {
    return {
      'type': 'AND',
      'children': [and, spacing],
      'offset': location().start.offset
    }
  }
NOT
  = not:'!' spacing:Spacing {
    return {
      'type': 'NOT',
      'children': [not, spacing],
      'offset': location().start.offset
    }
  }
QUESTION
  = question:'?' spacing:Spacing {
    return {
      'type': 'QUESTION',
      'children': [question, spacing],
      'offset': location().start.offset
    }
  }
STAR
  = star:'*' spacing:Spacing {
    return {
      'type': 'STAR',
      'children': [star, spacing],
      'offset': location().start.offset
    }
  }
PLUS
  = plus:'+' spacing:Spacing {
    return {
      'type': 'PLUS',
      'children': [plus, spacing],
      'offset': location().start.offset
    }
  }
OPEN
  = open:'(' spacing:Spacing {
    return {
      'type': 'OPEN',
      'children': [open, spacing],
      'offset': location().start.offset
    }
  }
CLOSE
  = close:')' spacing:Spacing {
    return {
      'type': 'CLOSE',
      'children': [close, spacing],
      'offset': location().start.offset
    }
  }
DOT
  = dot:'.' spacing:Spacing {
    return {
      'type': 'DOT',
      'children': [dot, spacing],
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
  = open:'#' content:(
      !EndOfLine dot:. {
        return dot
      })* endofline:EndOfLine {
    return {
      'type': 'Comment',
      'children': [open].concat(content.concat([endofline])),
      'offset': location().start.offset
    }
  }
Space
  = ' ' {
    return {
      'type': 'Space',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / '\t' {
    return {
      'type': 'Space',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / endofline:EndOfLine {
    return {
      'type': 'Space',
      'children': [endofline],
      'offset': location().start.offset
    }
  }
EndOfLine
  = '\r\n' {
    return {
      'type': 'EndOfLine',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / '\n' {
    return {
      'type': 'EndOfLine',
      'children': [text()],
      'offset': location().start.offset
    }
  }
  / '\r' {
    return {
      'type': 'EndOfLine',
      'children': [text()],
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
