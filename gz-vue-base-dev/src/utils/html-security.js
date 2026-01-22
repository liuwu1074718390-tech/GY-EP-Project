import DOMPurify from 'dompurify';

export function getSecureHtml(content) {
	return DOMPurify.sanitize(content);
}
