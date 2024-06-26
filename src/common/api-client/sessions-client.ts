import {
  ChatBotHistoryItem,
  ChatBotMessageType,
} from "../../components/chatbot/types";

import {
  assembleHistory
} from "../../components/chatbot/utils"
export class SessionsClient {

  // Adds a new session (NOT USED)
  async addSession(userId: string, sessionId: string, chatHistory: ChatBotHistoryItem[]) {
    await fetch('https://bu4z2a26c7.execute-api.us-east-1.amazonaws.com/user_session_handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "add_session",
        "user_id": userId,
        "session_id": sessionId,
        "chat_history": assembleHistory(chatHistory)
      })
    });
  }

  // Updates the current session (NOT USED)
  async updateSession(userId: string, sessionId: string, chatHistory: ChatBotHistoryItem[]) {
    console.log("updating session...")
    const response = await fetch('https://bu4z2a26c7.execute-api.us-east-1.amazonaws.com/user_session_handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "update_session",
        "user_id": userId,
        "session_id": sessionId,
        "chat_history": assembleHistory(chatHistory)
      })
    });
    const reader = response.body.getReader();
    const { value, done } = await reader.read();
    const decoder = new TextDecoder();
    const output = decoder.decode(value);
    // console.log(JSON.parse(output));
    // return JSON.parse(output);
  }

  // Gets all sessions tied to a given user ID
  // Return format: [{"session_id" : "string", "user_id" : "string", "time_stamp" : "dd/mm/yy", "title" : "string"}...]
  async getSessions(
    userId: string
  ) {
    const response = await fetch('https://bu4z2a26c7.execute-api.us-east-1.amazonaws.com/user_session_handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "operation": "list_sessions_by_user_id", "user_id": userId })
    });
    const reader = response.body.getReader();
    const { value, done } = await reader.read();
    const decoder = new TextDecoder();
    const output = decoder.decode(value);
    // console.log(output);
    return JSON.parse(output);
  }

  // Returns a chat history given a specific user ID and session ID
  // Return format: a list of ChatBotHistoryItems
  async getSession(
    sessionId: string,
    userId: string,
  ) : Promise<ChatBotHistoryItem[]> {
    const response = await fetch("https://bu4z2a26c7.execute-api.us-east-1.amazonaws.com/user_session_handler", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "operation": "get_session", "session_id": sessionId,
        "user_id": userId
      })
    });
    // console.log(response.body);
    const reader = response.body.getReader();
    const { value, done } = await reader.read();
    // console.log(value);
    const decoder = new TextDecoder();
    // console.log(decoder.decode(value));    
    const output = JSON.parse(decoder.decode(value)).chat_history! as any[];
    let history: ChatBotHistoryItem[] = [];
    // console.log(output);
    if (output === undefined) {
      return history;
    }
    output.forEach(function (value) {
      let metadata = {}
      if (value.metadata) {
        metadata = {"Sources" : JSON.parse(value.metadata)}
      }      
      history.push({
        type: ChatBotMessageType.Human,
        content: value.user,
        metadata: {
        },
        tokens: [],
      },
      {
        type: ChatBotMessageType.AI,
        tokens: [],
        content: value.chatbot,
        metadata: metadata,
      },)
    })
    // console.log(history);
    return history;
  }

  // Deletes a given session based on session ID and user ID (NOT USED)
  async deleteSession(
    sessionId: string,
    userId: string,
  ) {
    try {
      const response = await fetch('https://bu4z2a26c7.execute-api.us-east-1.amazonaws.com/user_session_handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "operation": "delete_session", "session_id": sessionId,
          "user_id": userId
        })
      });
    } catch {
      return "FAILED";
    }
    return "DONE";
  }

}
