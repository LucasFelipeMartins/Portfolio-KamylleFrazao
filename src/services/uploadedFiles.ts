import { Express } from 'express';
import { connection, model, models, Schema, Types } from 'mongoose';
import { unlink } from 'fs/promises';
import path from 'path';

interface StoredFile {
    contentType: string;
    data: Buffer;
}

const uploadedFileSchema = new Schema<StoredFile>({
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true }
}, { timestamps: true });

const UploadedFile = connection.models.UploadedFile ?? models.UploadedFile ?? model<StoredFile>('UploadedFile', uploadedFileSchema);

export async function saveUploadedFile(file: Express.Multer.File): Promise<string> {
    const uploadedFile = await UploadedFile.create({
        contentType: file.mimetype,
        data: file.buffer
    });

    return `/uploads/${uploadedFile.id}`;
}

export async function deleteUploadedFile(url?: string): Promise<void> {
    if (!url) return;

    const uploadId = url.match(/^\/uploads\/([a-f\d]{24})$/i)?.[1];
    if (uploadId && Types.ObjectId.isValid(uploadId)) {
        await UploadedFile.findByIdAndDelete(uploadId).exec();
        return;
    }

    // Mantém a remoção de imagens antigas, que ainda são servidas pelo diretório público.
    if (url.startsWith('/assets/images/')) {
        await unlink(path.join(__dirname, '../../public', url)).catch((error: unknown) => {
            console.error('Falha ao deletar arquivo:', error);
        });
    }
}

export async function findUploadedFile(id: string): Promise<StoredFile | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return UploadedFile.findById(id).lean<StoredFile>().exec();
}
