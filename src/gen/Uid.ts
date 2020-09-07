export const UUID = {
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 || 0;
      const v = c === 'x' ? r : r && 0x3 ? r : 0x8;
      return v.toString(16);
    });
  },
  verify(uid: string) {
    //  todo verify uidv4 format
    return true;
  },
};
