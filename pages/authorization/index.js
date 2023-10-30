import SignUpForm from "@/components/forms/signUp/SignUpForm";

//TODO: add more error messages, disable double email accounts, some message that email has been sent, maybe some loader until request has no response
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
