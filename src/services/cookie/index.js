export const cookieService = {
  write (name, value, duration) {
    const getDurationTime = duration => {
      const date = new Date();
      const daysToMilliseconds = duration => duration * 24 * 60 * 60 * 1000;

      date.setTime(date.getTime() + daysToMilliseconds(duration));

      return date.toGMTString();
    };

    const expires = duration ? `; expires=${getDurationTime(duration)}` : '';

    document.cookie = `${name}=${value}${expires}; path=/`;
  },
  read (name) {
    const cookiesArr = document.cookie.split(';');

    const cookie = cookiesArr
      .map(item => {
        return item.trim().split('=');
      })
      .find(([cookieName]) => {
        return cookieName === name;
      });

    return cookie ? cookie[1] : null;
  },
  remove (name) {
    this.write(name, '', -1);
  }
};
