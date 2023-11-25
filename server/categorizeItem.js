const OpenAI = require("openai");
require("dotenv").config();

// Replace with your actual OpenAI API key
const openaiApiKey = process.env.OPENAI_APIKEY;

const openai = new OpenAI({ apiKey: openaiApiKey });

const categorizeItem = async function (itemName) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Categorize the item: ${itemName}, in one of the following categories: To watch, To eat, To read or To buy`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const suggestedCategory = completion.choices[0].message.content.trim();

    return suggestedCategory;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to categorize item");
  }
};

async function main() {
  const itemName = "Sushi"; // Replace with the actual item name
  const suggestedCategory = await categorizeItem(itemName);

  console.log(`Suggested category for ${itemName}: ${suggestedCategory}`);
}

main();

module.exports = categorizeItem;

//object received from the api
// {
//   id: 'chatcmpl-8NphzB3iUq4UkbN2mNeal9q9pZeqP',
//   object: 'chat.completion',
//   created: 1700691003,
//   model: 'gpt-3.5-turbo-0613',
//   choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
//   usage: { prompt_tokens: 33, completion_tokens: 2, total_tokens: 35 }
// }

//object.choices
// [
//   {
//     index: 0,
//     message: { role: 'assistant', content: 'To eat' },
//     finish_reason: 'stop'
//   }
// ]
