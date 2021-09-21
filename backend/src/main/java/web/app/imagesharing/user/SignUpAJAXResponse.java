package web.app.imagesharing.user;

public class SignUpAJAXResponse {
    public boolean success;
    public ErrorCode errorCode;

    public enum ErrorCode {
        USER_EXIST
    }
}
