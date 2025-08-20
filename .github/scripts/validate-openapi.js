const SwaggerParser = require('@apidevtools/swagger-parser');
const glob = require('glob');

// Define the files we want to validate
const TARGET_FILES = ['transaction.yaml', 'meta.yaml', 'registry.yaml'];

// Function to validate a single OpenAPI file
async function validateOpenApiFile(filePath) {
  try {
    await SwaggerParser.validate(filePath);
    console.log(`✅ Valid: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Invalid: ${filePath}`);
    console.error(`   Error: ${error.message}`);
    
    if (error.path) {
      console.error(`   Location: ${error.path.join('.')}`);
    }
    return false;
  }
}

// Main function
async function main() {
  let failures = 0;
  
  // Find all target files in the repository
  for (const targetFile of TARGET_FILES) {
    const files = glob.sync(`**/${targetFile}`, { 
      ignore: ['**/node_modules/**', '.github/**']
    });
    
    console.log(`Found ${files.length} ${targetFile} files to validate`);
    
    // Validate each file
    for (const file of files) {
      const isValid = await validateOpenApiFile(file);
      if (!isValid) failures++;
    }
  }
  
  // Exit with appropriate code
  if (failures > 0) {
    console.error(`\n❌ Validation failed for ${failures} files`);
    process.exit(1);
  } else {
    console.log('\n✅ All OpenAPI specifications are valid!');
    process.exit(0);
  }
}

// Run the validation
main().catch(error => {
  console.error('An unexpected error occurred during validation:', error);
  process.exit(1);
});