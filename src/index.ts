import { Command } from "commander";
import { createEmbeddingApp } from "./createEmbedding";
import { questionAnsweringWithEmbeddingApp } from "./questionAnswerringWithEmbedding";

function main() {
  const program = new Command();
    program
        .command("create-embedding <infile> <outfile>")
        .description("create embeddings for a text file")
        .action(async (infile, outfile) => {
            await createEmbeddingApp(infile, outfile);
        });
  
  program
        .command("qa-with-embedding <question>")
        .description("question answering with embeddings")
        .option("-d, --debug", "debug mode", false)
        .option("-cn, --context-num <contextNum>", "number of context chunks considered", "5")
        .action(async (question, options) => {
            await questionAnsweringWithEmbeddingApp(question, {
                debug: options.debug,
                contextNum: parseInt(options.contextNum),
                contextFile: "data/faq.json"
            });
        });
  
  program.parse(process.argv);
}
main()
