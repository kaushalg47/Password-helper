import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function modifyPassword() {
  const passwordField = document.getElementById("password");
  const originalText = passwordField.value;
  const hashedPassword = await hashPassword(originalText);
  passwordField.value = hashedPassword;
}

modifyPassword();
