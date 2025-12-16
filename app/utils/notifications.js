import * as Notifications from 'expo-notifications';

// how notifications behave when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// schedule ONE reminder at chosen date
export async function scheduleReminderAtDate(date, medication) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '💊 Medication Reminder',
      body: `Time to take ${medication}`,
      sound: 'default',
    },
    trigger: {
        type: 'calendar',
        year: date.getFullYear(),
        month: date.getMonth() + 1, 
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: 0,
        }
  });

  return id;
}

// daily reminder (optional)
export async function scheduleDailyReminder(hour, minute, medication) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '💊 Daily Medication',
      body: `Don't forget to take ${medication}`,
      sound: 'default',
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });

  return id;
}

export async function cancelNotification(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
