#!/bin/bash

# Simple script to deploy to GitHub Pages

echo "🚀 Starting deployment to GitHub Pages..."

# Save current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📌 Current branch: $CURRENT_BRANCH"

# Create or update gh-pages branch with content from current branch
echo "🔄 Creating/updating gh-pages branch..."
git checkout -B gh-pages

# Force add all files
echo "📦 Adding all files..."
git add -A

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages $(date)"

# Push to gh-pages branch
echo "📤 Pushing to gh-pages branch..."
git push -f origin gh-pages

# Return to original branch
echo "↩️ Returning to $CURRENT_BRANCH branch..."
git checkout $CURRENT_BRANCH

echo "✅ Deployment complete! Your site will be available at:"
echo "🌐 https://jsohndata.github.io/fortune-cookie/"
