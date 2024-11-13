// ver y ocultar contraseña
export function showPassword(id: string, idShowPassword: string) {
    const password = <HTMLInputElement>document.getElementById(id)!;
    const show_password = <HTMLInputElement>document.getElementById(idShowPassword)!;

    if (password.type == 'password') {
        password.type = 'text';
        show_password.src = "../../../assets/img/eye-open.svg";

        setTimeout(function () {
            password.type = 'password';
            show_password.src = "../../../assets/img/eye-close.svg";
        }, 3000);

    } else {
        password.type = 'password';
        show_password.src = "../../../assets/img/eye-close.svg";
    }
}