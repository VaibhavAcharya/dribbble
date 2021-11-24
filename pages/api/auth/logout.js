import { setCookie } from "./../../../utils/cookies";

export default async (req, res) => {
  setCookie(res, "auth", "", { maxAge: -1, path: "/" });
  res.status(200).send();
};
