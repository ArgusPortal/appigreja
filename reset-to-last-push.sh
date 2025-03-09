#!/bin/bash

# Script to reset working directory to the last pushed commit
echo "⚠️ WARNING: This will reset your working directory to the last pushed commit."
echo "All local changes will be lost!"
echo ""
read -p "Are you sure you want to continue? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Fetching latest changes from remote..."
    git fetch

    echo "🔄 Resetting to the last pushed commit..."
    git reset --hard @{u}

    echo "🧹 Cleaning up untracked files and directories..."
    git clean -fd

    echo "✅ Reset complete! Your working directory is now at the last pushed commit."
else
    echo "❌ Reset cancelled."
fi
