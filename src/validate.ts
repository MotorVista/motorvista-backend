const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: string): boolean {
    return !!String(email).toLowerCase().match(EMAIL_REGEX)
}

export function obscureEmail(email: string): string {
    return email.replace(/(^.|@[^@](?=[^@]*$)|\.[^.]+$)|./g, (x, y) => y || '*');
}