import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Test = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      <main className="container max-w-6xl space-y-12 my-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-heading text-balance">
            Mental Wellness Test
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
            This is a placeholder page for the mental wellness test.
          </p>
          <div className="mt-8">
            <Link to="/">
              <Button size="lg" variant="outline">Go Back Home</Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Test;