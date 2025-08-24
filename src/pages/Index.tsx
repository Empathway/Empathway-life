import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, FileText, HeartHandshake } from "lucide-react";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      {/* Navbar - Integrated into the landing page as I cannot create a separate file */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-bold gradient-text">Empathway</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/test">Take our free test</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/patient/posts">View our blogs</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/patient/anxiety-calmer">Anxiety Calmer</Link>
            </Button>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* End Navbar */}

      <main className="container max-w-6xl space-y-12 my-auto mt-20">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-heading text-balance">
            Empathway
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your dedicated platform for mental health and well-being in the construction industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link to="/register">
              <Button size="lg" variant="elegant">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Log In</Button>
            </Link>
          </div>
        </motion.header>

        <section id="for-workers" className="space-y-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-heading font-semibold gradient-heading"
          >
            For Construction Workers
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">AI Chatbot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with our AI assistant for immediate, confidential support and coping strategies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Find a Therapist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Browse and connect with licensed mental health professionals specializing in your industry.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Resource Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access articles, videos, and exercises designed to support your mental wellness.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <HeartHandshake className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Peer Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Engage with a community of fellow workers who understand your unique challenges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        <section id="for-therapists" className="space-y-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-heading font-semibold gradient-heading"
          >
            For Mental Health Professionals
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 gap-6 text-left"
          >
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Dedicated Patient Base</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with a targeted community of construction workers seeking mental health support.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="h-full bg-black/40 border-border backdrop-blur-md">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Content Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Publish articles and resources to help a community in need and establish your expertise.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
      
      <footer className="w-full text-center p-8 mt-12 border-t border-border">
  <p className="text-sm text-muted-foreground">&copy; 2024 Empathway. All rights reserved.</p>
</footer>
    </div>
  );
};

export default Index;