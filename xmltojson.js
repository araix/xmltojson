const fs = require('fs');
const xml2js = require('xml2js');

// Function to convert XML file to JSON
async function convertXmlToJson(inputFilePath, outputFilePath) {
    try {
        // Read the XML file
        const xmlData = fs.readFileSync(inputFilePath, 'utf8');
        
        // Create a parser instance
        const parser = new xml2js.Parser({
            explicitArray: false,  // Prevents wrapping single elements in arrays
            trim: true,           // Trims whitespace from text
            normalize: true       // Normalizes whitespace in text
        });

        // Parse XML to JSON
        const result = await parser.parseStringPromise(xmlData);
        
        // Convert JSON object to string with formatting
        const jsonString = JSON.stringify(result, null, 2);
        
        // Write JSON to output file
        fs.writeFileSync(outputFilePath, jsonString);
        
        console.log(`Successfully converted ${inputFilePath} to ${outputFilePath}`);
        return result;
        
    } catch (error) {
        console.error('Error converting XML to JSON:', error);
        throw error;
    }
}

// Example usage
const inputFile = 'input.xml';
const outputFile = 'output.json';

// Run the conversion
convertXmlToJson(inputFile, outputFile)
    .then(() => console.log('Conversion complete'))
    .catch(err => console.error('Conversion failed:', err));

// Example of how to use with command line arguments
// Uncomment and run with: node script.js input.xml output.json
/*
if (process.argv.length !== 4) {
    console.log('Usage: node script.js <input.xml> <output.json>');
    process.exit(1);
}

const [,, inputArg, outputArg] = process.argv;
convertXmlToJson(inputArg, outputArg);
*/