#!/bin/bash
# Generate scene-N.html wrappers (engine.js + scenes/sN.js)
cd "$(dirname "$0")/.."
for n in "$@"; do
cat > scene-$n.html <<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Viral Psychology Scene $n</title>
</head>
<body>
<script src="engine.js"></script>
<script src="scenes/s$n.js"></script>
</body>
</html>
HTML
done
