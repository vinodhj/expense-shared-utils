#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
    echo -e "${YELLOW}==== $1 ====${NC}"
}

# Clean previous builds
print_header "Cleaning Previous Build"
rm -rf dist

# Build the package
print_header "Building Package"
bun run build

# Detailed file size check
print_header "Detailed Bundle File Sizes"
find dist -type f -exec ls -lh {} \; | awk '{print $5 "\t" $9}'

# Precise byte count
print_header "Precise Byte Count"
find dist -type f -exec wc -c {} \;

# Total bundle size (human-readable)
print_header "Total Bundle Size"
du -sh dist

# Optional: Count number of files
print_header "File Count"
find dist -type f | wc -l

# Optional: File type and encoding
print_header "File Type Information"
file dist/*