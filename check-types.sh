#!/bin/bash

# Script to check for all TypeScript errors in the codebase
# Run with: bash check-types.sh

echo "🔍 Checking for TypeScript errors..."
echo ""

# Run TypeScript compiler in check mode
npx tsc --noEmit

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ No TypeScript errors found!"
else
    echo ""
    echo "❌ TypeScript errors found. See above for details."
    exit $EXIT_CODE
fi

