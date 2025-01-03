import { db } from "@/lib/prisma";



export async function GET(req: Request) {
    const cronToken = process.env.CRON_JOB_TOKEN;
    const tokenFromRequest = req.headers.get('x-cron-token') || new URL(req.url).searchParams.get('token');

    if (`${tokenFromRequest}-abc123def` !== `${cronToken}-abc123def`) {
        return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const removeUserForm = new Date();
    removeUserForm.setDate(removeUserForm.getDate() - 14);

    const df = await db.uploadFile.deleteMany({
        where: {
            createdAt: {
                lte: removeUserForm
            }
        }
    })


    return Response.json({ deletedFileCount: df.count, message: 'User Uploaded files deleted successfully' });
}