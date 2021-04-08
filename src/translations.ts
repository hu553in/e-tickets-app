import { IssueMethod } from './constants';

const translations = {
  en: {
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
        messages: {
          numberAlreadyExists: 'Number already exists!',
          ticketIsAddedSuccessfully: 'Ticket is added successfully!',
        },
        buttons: {
          add: 'Add',
          ok: 'Ok',
          cancel: 'Cancel',
          today: 'Today',
        },
      },
      generateNewTicket: {
        messages: {
          ticketIsGeneratedSuccessfully: 'Ticket is generated successfully!',
        },
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
        messages: {
          ticketIsDeletedSuccessfully: 'Ticket is deleted successfully!',
          setIsAlreadyUsedSuccess: {
            true: 'Ticket is marked as used successfully!',
            false: 'Ticket is marked as not used successfully!',
          },
        },
        labels: {
          issueMethod: 'Issue method',
          isAlreadyUsed: 'Is used',
        },
        issueMethods: {
          [IssueMethod.MANUAL]: 'manual',
          [IssueMethod.AUTOMATIC]: 'automatic',
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
      lottery: {
        buttons: {
          choose: 'Choose',
          chooseMore: 'Choose more',
          noTickets: 'No tickets',
          noMoreTickets: 'No more tickets',
          reset: 'Reset',
        },
      },
      main: {
        buttons: {
          issueTicket: 'Issue ticket',
          issuedTickets: 'Issued tickets',
          lottery: 'Lottery',
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
  ru: {
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
        messages: {
          numberAlreadyExists: 'Номер уже существует!',
          ticketIsAddedSuccessfully: 'Билет добавлен успешно!',
        },
        buttons: {
          add: 'Добавить',
          ok: 'Ок',
          cancel: 'Отмена',
          today: 'Сегодня',
        },
      },
      generateNewTicket: {
        messages: {
          ticketIsGeneratedSuccessfully: 'Билет сгенерирован успешно!',
        },
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
        messages: {
          ticketIsDeletedSuccessfully: 'Билет удален успешно!',
          setIsAlreadyUsedSuccess: {
            true: 'Билет успешно отмечен как использованный!',
            false: 'Билет успешно отмечен как неиспользованный!',
          },
        },
        labels: {
          issueMethod: 'Метод выпуска',
          isAlreadyUsed: 'Использован',
        },
        issueMethods: {
          [IssueMethod.MANUAL]: 'вручную',
          [IssueMethod.AUTOMATIC]: 'автоматически',
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
      lottery: {
        buttons: {
          choose: 'Выбрать',
          chooseMore: 'Выбрать еще',
          noTickets: 'Нет билетов',
          noMoreTickets: 'Больше нет билетов',
          reset: 'Сбросить',
        },
      },
      main: {
        buttons: {
          issueTicket: 'Выпустить билет',
          issuedTickets: 'Билеты',
          lottery: 'Лотерея',
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

export default translations;
