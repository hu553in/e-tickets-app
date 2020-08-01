import { ISSUE_METHODS } from './constants';

export default {
  en_US: {
    common: {
      buttons: {
        mainMenu: 'Main menu',
      },
      labels: {
        number: 'Number',
        issuedAt: 'Issued at',
        updatedAt: 'Updated at',
      },
    },
    pages: {
      addExistingTicket: {
        errors: {
          numberAlreadyExists: 'Number already exists!',
        },
        buttons: {
          add: 'Add',
          ok: 'Ok',
          cancel: 'Cancel',
          today: 'Today',
        },
      },
      generateNewTicket: {
        buttons: {
          generate: 'Generate',
          generateMore: 'Generate more',
          copyToClipboard: 'Copy to clipboard',
        },
      },
      issueTicket: {
        buttons: {
          newTicket: 'New ticket',
          existingTicket: 'Existing ticket',
        },
      },
      issuedTickets: {
        labels: {
          issueMethod: 'Issue method',
          isAlreadyUsed: 'Is already used',
        },
        issueMethods: {
          [ISSUE_METHODS.MANUAL]: 'manual',
          [ISSUE_METHODS.AUTOMATIC]: 'automatic',
        },
        table: {
          body: {
            emptyDataSourceMessage: 'No tickets',
          },
          pagination: {
            firstTooltip: 'First Page',
            lastTooltip: 'Last Page',
            previousTooltip: 'Previous Page',
            nextTooltip: 'Next Page',
          },
          toolbar: {
            searchTooltip: 'Search',
            searchPlaceholder: 'Search',
          },
        },
      },
      main: {
        buttons: {
          issueTicket: 'Issue ticket',
          issuedTickets: 'Issued tickets',
          signOut: 'Sign out',
        },
      },
      signIn: {
        labels: {
          email: 'E-mail',
          password: 'Password',
        },
        buttons: {
          signIn: 'Sign in',
        },
      },
    },
  },
  ru_RU: {
    common: {
      buttons: {
        mainMenu: 'Главное меню',
      },
      labels: {
        number: 'Номер',
        issuedAt: 'Выпущен',
        updatedAt: 'Обновлен',
      },
    },
    pages: {
      addExistingTicket: {
        errors: {
          numberAlreadyExists: 'Номер уже существует!',
        },
        buttons: {
          add: 'Добавить',
          ok: 'Ок',
          cancel: 'Отмена',
          today: 'Сегодня',
        },
      },
      generateNewTicket: {
        buttons: {
          generate: 'Сгенерировать',
          generateMore: 'Сгенерировать еще',
          copyToClipboard: 'Скопировать',
        },
      },
      issueTicket: {
        buttons: {
          newTicket: 'Новый билет',
          existingTicket: 'Существующий',
        },
      },
      issuedTickets: {
        labels: {
          issueMethod: 'Метод выпуска',
          isAlreadyUsed: 'Уже использован',
        },
        issueMethods: {
          [ISSUE_METHODS.MANUAL]: 'вручную',
          [ISSUE_METHODS.AUTOMATIC]: 'автоматически',
        },
        table: {
          body: {
            emptyDataSourceMessage: 'Нет билетов',
          },
          pagination: {
            firstTooltip: 'Первая страница',
            lastTooltip: 'Последняя страница',
            previousTooltip: 'Предыдущая страница',
            nextTooltip: 'Следующая страница',
          },
          toolbar: {
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск',
          },
        },
      },
      main: {
        buttons: {
          issueTicket: 'Выпустить билет',
          issuedTickets: 'Билеты',
          signOut: 'Выйти',
        },
      },
      signIn: {
        labels: {
          email: 'Почтовый адрес',
          password: 'Пароль',
        },
        buttons: {
          signIn: 'Войти',
        },
      },
    },
  },
};
