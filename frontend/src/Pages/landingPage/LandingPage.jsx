import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Free Resume Templates",
    description: "Get access to beautiful resume templates without any cost."
  },
  {
    title: "AI-Powered Resume Generation",
    description: "Fill simple forms and let AI create professional summaries and skills for you."
  },
  {
    title: "Premium Templates",
    description: "Unlock premium templates after secure Stripe payment for a more professional look."
  },
  {
    title: "Resume Management",
    description: "Edit, update or delete your saved resumes anytime through your dashboard."
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800 bg-white text-gray-800">

      {/* Hero Section */}
      <section className="dark:bg-gray-800 dark:text-gray-200 bg-gray-50 py-20 px-6 flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left gap-10">
  {/* Left Content */}
  <div className="md:w-1/2 ">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
      Craft Your Professional Resume Effortlessly
    </h1>
    <p className="text-lg text-gray-600 mb-6 dark:text-gray-300">
      Utilize AI-powered tools and premium templates to create standout resumes.
    </p>
    <Button className="px-6 py-3 text-lg">Get Started for Free</Button>
  </div>

  {/* Right Image */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src="/herosection.png"
      alt="Resume Preview"
      className="w-full max-w-md rounded-lg shadow-lg"
    />
  </div>
</section>


      {/* Services Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-200">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl font-semibold">{service.title}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-6 dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Is the resume builder free to use?</h3>
            <p className="text-gray-700 dark:text-gray-400">Yes, you can start building your resume for free with access to basic templates and features.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">How does the AI-powered resume generation work?</h3>
            <p className="text-gray-700 dark:text-gray-400">Our AI analyzes your input and generates professional summaries and skill suggestions tailored to your industry.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Can I download my resume?</h3>
            <p className="text-gray-700 dark:text-gray-400">Absolutely! You can download your resume in PDF format once you're satisfied with the design.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900 dark:text-gray-200">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6 ">
              <p className="italic text-gray-700 dark:text-gray-200">"This platform made resume building so easy and efficient. Highly recommended!"</p>
              <p className="mt-4 font-semibold text-gray-900 dark:text-gray-300">— Aisha M.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic text-gray-700 dark:text-gray-200">"The AI suggestions were spot on. My resume has never looked better."</p>
              <p className="mt-4 font-semibold text-gray-900 dark:text-gray-300">— Kamran R.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="italic text-gray-700 dark:text-gray-200">"A seamless experience from start to finish. The templates are top-notch."</p>
              <p className="mt-4 font-semibold text-gray-900 dark:text-gray-300">— Sara B.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-black py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">ResumeBuilder</h3>
            <p>Your go-to platform for crafting professional resumes with ease.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
