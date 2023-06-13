import LoginForm from "@/components/forms/LoginForm";

//TODO:
function LoginPage() {
  return (
    <div className="h-full">
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-4">
        Login page
      </h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
