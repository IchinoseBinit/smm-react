import { toaster } from "@/components/ui/toaster";

function calculatePasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}
function getStrengthLabel(strength: number) {
  if (strength <= 2) return { color: "red.400", label: "Weak" };
  if (strength <= 4) return { color: "yellow.400", label: "Moderate" };
  return { color: "green.400", label: "Strong" };
}
const handleSuccess = (title: string, description: string) => {
  toaster.success({
    title: title,
    description: description,
  });
};
const handleError = (title: string, error: Error) => {
  console.error(error);
  toaster.error({
    title: title,
    description: error.message,
    closable: true,
  });
};

export {
  handleSuccess,
  handleError,
  calculatePasswordStrength,
  getStrengthLabel,
};
