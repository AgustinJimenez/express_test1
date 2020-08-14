import { ejs as render } from "consolidate"

export default async (template_path: string, params: object = {}) => await render(template_path, params)
