import SignUpForm from "@/components/forms/SignUpForm";

function AuthPage() {
  return (
    <div className="h-full">
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-4">
        Authorization page
      </h1>
      <SignUpForm />
    </div>
  );
}

export default AuthPage;
