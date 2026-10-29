/* eslint-disable indent */
/**
 * This function receive error code and return a string
 * @param errorCode string error code return from server
 * @returns {string} translated string
 */
export const translateErrorCode = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email': {
      return 'Email không hợp lệ';
    }
    case 'auth/user-disabled': {
      return 'Tài khoản đã bị khóa';
    }
    case 'auth/wrong-password': {
      return 'Tài khoản/mật khẩu không đúng';
    }
    case 'auth/user-not-found': {
      return 'Tài khoản/mật khẩu không đúng';
    }
    default: {
      return 'Đã có lỗi xảy ra';
    }
  }
};
