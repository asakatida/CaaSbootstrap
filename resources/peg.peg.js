const Bacon = require('baconjs').Bacon;

module.exports = function (req, res) {
  res.send(
    "# Hierarchical syntax\n" +
    "Grammar <- Spacing Definition+ EndOfFile\n" +
    "Definition <- Identifier LEFTARROW Expression\n" +
    "Expression <- Sequence (SLASH Sequence)*\n" +
    "Sequence <- Prefix*\n" +
    "Prefix <- (AND / NOT)? Suffix\n" +
    "Suffix <- Primary (QUESTION / STAR / PLUS)?\n" +
    "Primary <- Identifier !LEFTARROW / OPEN Expression CLOSE / Literal / Class / DOT\n" +
    "# Lexical syntax\n" +
    "Identifier <- IdentStart IdentCont* Spacing\n" +
    "IdentStart <- [a-zA-Z_]\n" +
    "IdentCont <- IdentStart / [0-9]\n" +
    "Literal <- ['] (!['] Char)* ['] Spacing / [\"] (![\"] Char)* [\"] Spacing\n" +
    "Class <- '[' (!']' Range)* ']' Spacing\n" +
    "Range <- Char '-' Char / Char\n" +
    "Char <- '\\\\' [nrt'\"\\[\\]\\\\] / '\\\\' [0-2][0-7][0-7] / '\\\\' [0-7][0-7]? / !'\\\\' .\n" +
    "LEFTARROW <- '<-' Spacing\n" +
    "SLASH <- '/' Spacing\n" +
    "AND <- '&' Spacing\n" +
    "NOT <- '!' Spacing\n" +
    "QUESTION <- '?' Spacing\n" +
    "STAR <- '*' Spacing\n" +
    "PLUS <- '+' Spacing\n" +
    "OPEN <- '(' Spacing\n" +
    "CLOSE <- ')' Spacing\n" +
    "DOT <- '.' Spacing\n" +
    "Spacing <- (Space / Comment)*\n" +
    "Comment <- '#' (!EndOfLine .)* EndOfLine\n" +
    "Space <- ' ' / '\\t' / EndOfLine\n" +
    "EndOfLine <- '\\r\\n' / '\\n' / '\\r'\n" +
    "EndOfFile <- !.\n");
};
