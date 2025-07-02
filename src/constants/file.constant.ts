const oneKb = 1024;
const oneMb = oneKb * 1024;
const maxDocumentFileSize = 1000 * oneMb;

export const MAX_DOCUMENT_FILE_SIZE = maxDocumentFileSize;
export const MAX_DOCUMENT_FILE_COUNT = 10;
export const ALLOWED_DOCUMENT_FILE_TYPE = /\.(pdf|doc|docx|xls|xlsx|pptx)$/;

export const MAX_KHMER_OCR_FILE_SIZE = 10 * oneMb;
export const MAX_KHMER_OCR_FILE_COUNT = 10;
export const ALLOWED_KHMER_OCR_FILE_TYPE = /\.(jpg|jpeg|png)$/;
