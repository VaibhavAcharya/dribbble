export default async (req, res) => {
  res.json(req?.cookies?.auth ?? {});
};
