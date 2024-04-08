class LevelStorage {
    static maxPassed = 0;

    getCookie(name: string): string {
        for (let cookie of document.cookie.split(';')) {
            if (cookie.length == 0) continue;
            const curName = cookie.split('=')[0].trim();
            const curValue = cookie.split('=')[1].trim();
            if (curName == name) {
                return curValue;
            }
        }
        return "";
    }
    getMaxPassed(): integer {
        let cookieValue: integer = 0;
        if (this.getCookie("maxPassed") !== "") {
            cookieValue = parseInt(this.getCookie("maxPassed"));
        }

        LevelStorage.maxPassed = Math.max(cookieValue, LevelStorage.maxPassed);
        return LevelStorage.maxPassed;
    }
    setMaxPassed(level: integer) {
        LevelStorage.maxPassed = Math.max(this.getMaxPassed(), level);
        document.cookie = `maxPassed=${LevelStorage.maxPassed}; samesite=strict`;
    }
};

export default new LevelStorage();
