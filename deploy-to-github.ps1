# SoundVerse.ai - Automated GitHub Deployment Script
# Run this script to automatically deploy your project to GitHub

Write-Host "🚀 SoundVerse.ai - GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Navigate to project directory
$projectPath = "C:\Users\LOQ\OneDrive\Desktop\Web Dev\SoundVerse.ai"
Write-Host "📁 Navigating to project directory..." -ForegroundColor Yellow
Set-Location $projectPath

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Make sure you're in the right directory." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json - in correct directory" -ForegroundColor Green

# Remove existing git history if it exists
Write-Host "🧹 Cleaning up existing git history..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
    Write-Host "✅ Removed existing .git directory" -ForegroundColor Green
} else {
    Write-Host "✅ No existing .git directory found" -ForegroundColor Green
}

# Check if .gitignore exists
Write-Host "📝 Checking .gitignore file..." -ForegroundColor Yellow
if (!(Test-Path ".gitignore")) {
    Write-Host "❌ .gitignore file missing! Please create it first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ .gitignore file found" -ForegroundColor Green

# Initialize git repository
Write-Host "🔧 Initializing git repository..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to initialize git repository" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git repository initialized" -ForegroundColor Green

# Configure git user (optional - will use global config if set)
Write-Host "👤 Configuring git user..." -ForegroundColor Yellow
git config user.name "abhijeetBhale" 2>$null
git config user.email "abhijeet@example.com" 2>$null
Write-Host "✅ Git user configured" -ForegroundColor Green

# Add remote repository
Write-Host "🌐 Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/abhijeetBhale/SoundVerse.ai.git
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to add remote repository" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Remote repository added" -ForegroundColor Green

# Stage all files
Write-Host "📦 Staging files..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to stage files" -ForegroundColor Red
    exit 1
}

# Check what files are staged
Write-Host "📋 Checking staged files..." -ForegroundColor Yellow
$stagedFiles = git diff --cached --name-only
$nodeModulesFound = $stagedFiles | Where-Object { $_ -like "*node_modules*" }

if ($nodeModulesFound) {
    Write-Host "❌ ERROR: node_modules found in staged files!" -ForegroundColor Red
    Write-Host "Please check your .gitignore file." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files staged successfully (no node_modules found)" -ForegroundColor Green
Write-Host "📄 Files to be committed:" -ForegroundColor Cyan
$stagedFiles | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "feat: initial commit - SoundVerse.ai music streaming platform

- Complete Next.js 14 application with TypeScript
- Advanced audio player with queue management
- Responsive design for all Chrome DevTools devices
- Howler.js integration for cross-browser audio support
- PowerGrotesk typography with custom font loading
- Aurora effects and smooth animations
- Logarithmic volume scaling for natural audio perception
- Professional documentation and comprehensive type definitions
- Vercel deployment configuration"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create commit" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Initial commit created" -ForegroundColor Green

# Set main branch
Write-Host "🌿 Setting main branch..." -ForegroundColor Yellow
git branch -M main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to set main branch" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Main branch set" -ForegroundColor Green

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⏳ This may take a moment..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "" -ForegroundColor Green
    Write-Host "🎉 SUCCESS! Your project has been deployed to GitHub!" -ForegroundColor Green
    Write-Host "=============================================" -ForegroundColor Green
    Write-Host "📍 Repository URL: https://github.com/abhijeetBhale/SoundVerse.ai" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Green
    Write-Host "🌐 Next Steps - Deploy to Vercel:" -ForegroundColor Yellow
    Write-Host "1. Go to https://vercel.com" -ForegroundColor White
    Write-Host "2. Click 'New Project'" -ForegroundColor White
    Write-Host "3. Import your GitHub repository: abhijeetBhale/SoundVerse.ai" -ForegroundColor White
    Write-Host "4. Framework Preset: Next.js" -ForegroundColor White
    Write-Host "5. Click 'Deploy'" -ForegroundColor White
    Write-Host "" -ForegroundColor Green
    Write-Host "✨ Your SoundVerse.ai will be live in minutes!" -ForegroundColor Green
} else {
    Write-Host "" -ForegroundColor Red
    Write-Host "❌ FAILED to push to GitHub" -ForegroundColor Red
    Write-Host "Please check the error messages above and try again." -ForegroundColor Red
    Write-Host "You may need to authenticate with GitHub first." -ForegroundColor Yellow
}

Write-Host "" -ForegroundColor White
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")