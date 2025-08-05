import { Mail, MoveRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { getUser, resendverificationemail } from "../../store/auth";

function SendVerificationEmailForPatient() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleresendemail(e) {
    e.preventDefault();
    dispatch(resendverificationemail(user?.email ?? null)).then((data) => {
      if (data.payload.success) {
        dispatch(getUser());
      }
    });
  }

  const getMailboxLink = () => {
    const email = user?.email || "";
    if (email.includes("gmail")) {
      return "https://mail.google.com";
    }
    return `https://www.${email.split("@")[1]}`;
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-200 p-4">
      <div className="w-full max-w-md rounded-xl bg-blue-50 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
          <Mail className="h-8 w-8 text-indigo-600" />
        </div>

        <h1 className="text-3xl font-bold text-cyan-300">Verify Your Email</h1>

        <p className="mt-4 text-base text-gray-600">
          We've sent a verification link to your email address:
          <br />
          <span className="mt-2 inline-block font-semibold text-indigo-700">
            {user?.email}
          </span>
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Please click the link in the email to complete your account
          verification.
        </p>

        <div className="mt-8">
          <a href={getMailboxLink()} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Go to My Inbox
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>

        <div className="mt-8 text-sm ">
          <p className="text-gray-500">
            Didn't receive the email? Check your spam folder or{" "}
          </p>
          <Button
            onClick={handleresendemail}
            className="mt-4 font-medium bg-violet-300 hover:bg-violet-400 text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm"
          >
            resend the link
          </Button>
          .
        </div>
      </div>
    </div>
  );
}

export default SendVerificationEmailForPatient;
