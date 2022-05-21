// ==UserScript==
// @name         WhatsApp Agent
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://web.whatsapp.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @grant        none
// ==/UserScript==

const exposeStore = (moduleRaidStr) => {
  console.log("Pasten 1");
  eval("var moduleRaid = " + moduleRaidStr);
  console.log("Pasten 2");
  // eslint-disable-next-line no-undef
  window.mR = moduleRaid();
  window.Store = Object.assign(
    {},
    window.mR.findModule((m) => m.default && m.default.Chat)[0].default
  );
  window.Store.AppState = window.mR.findModule("Socket")[0].Socket;
  window.Store.Conn = window.mR.findModule("Conn")[0].Conn;
  window.Store.BlockContact = window.mR.findModule("blockContact")[0];
  window.Store.Call = window.mR.findModule("CallCollection")[0].CallCollection;
  window.Store.Cmd = window.mR.findModule("Cmd")[0].Cmd;
  window.Store.CryptoLib = window.mR.findModule("decryptE2EMedia")[0];
  window.Store.DownloadManager =
    window.mR.findModule("downloadManager")[0].downloadManager;
  window.Store.MDBackend = window.mR.findModule("isMDBackend")[0].isMDBackend();
  window.Store.Features = window.mR.findModule(
    "FEATURE_CHANGE_EVENT"
  )[0].LegacyPhoneFeatures;
  window.Store.GroupMetadata = window.mR.findModule(
    (module) => module.default && module.default.handlePendingInvite
  )[0].default;
  window.Store.Invite = window.mR.findModule("sendJoinGroupViaInvite")[0];
  window.Store.InviteInfo = window.mR.findModule("sendQueryGroupInvite")[0];
  window.Store.Label =
    window.mR.findModule("LabelCollection")[0].LabelCollection;
  window.Store.MediaPrep = window.mR.findModule("MediaPrep")[0];
  window.Store.MediaObject = window.mR.findModule("getOrCreateMediaObject")[0];
  window.Store.NumberInfo = window.mR.findModule("formattedPhoneNumber")[0];
  window.Store.MediaTypes = window.mR.findModule("msgToMediaType")[0];
  window.Store.MediaUpload = window.mR.findModule("uploadMedia")[0];
  window.Store.MsgKey = window.mR.findModule(
    (module) => module.default && module.default.fromString
  )[0].default;
  window.Store.MessageInfo = window.mR.findModule("sendQueryMsgInfo")[0];
  window.Store.OpaqueData = window.mR.findModule(
    (module) => module.default && module.default.createFromData
  )[0].default;
  window.Store.QueryExist = window.mR.findModule("queryExists")[0].queryExists;
  window.Store.QueryProduct = window.mR.findModule("queryProduct")[0];
  window.Store.QueryOrder = window.mR.findModule("queryOrder")[0];
  window.Store.SendClear = window.mR.findModule("sendClear")[0];
  window.Store.SendDelete = window.mR.findModule("sendDelete")[0];
  window.Store.SendMessage = window.mR.findModule("addAndSendMsgToChat")[0];
  window.Store.SendSeen = window.mR.findModule("sendSeen")[0];
  window.Store.User = window.mR.findModule("getMaybeMeUser")[0];
  window.Store.UploadUtils = window.mR.findModule((module) =>
    module.default && module.default.encryptAndUpload ? module.default : null
  )[0].default;
  window.Store.UserConstructor = window.mR.findModule((module) =>
    module.default &&
    module.default.prototype &&
    module.default.prototype.isServer &&
    module.default.prototype.isUser
      ? module.default
      : null
  )[0].default;
  window.Store.Validators = window.mR.findModule("findLinks")[0];
  window.Store.VCard = window.mR.findModule("vcardFromContactModel")[0];
  window.Store.Wap = window.mR.findModule("queryLinkPreview")[0].default;
  window.Store.WidFactory = window.mR.findModule("createWid")[0];
  window.Store.ProfilePic = window.mR.findModule("profilePicResync")[0];
  window.Store.PresenceUtils = window.mR.findModule("sendPresenceAvailable")[0];
  window.Store.ChatState = window.mR.findModule("sendChatStateComposing")[0];
  window.Store.GroupParticipants = window.mR.findModule(
    "sendPromoteParticipants"
  )[0];
  window.Store.JoinInviteV4 = window.mR.findModule(
    "sendJoinGroupViaInviteV4"
  )[0];
  window.Store.findCommonGroups =
    window.mR.findModule("findCommonGroups")[0].findCommonGroups;
  window.Store.StatusUtils = window.mR.findModule("setMyStatus")[0];
  window.Store.StickerTools = {
    ...window.mR.findModule("toWebpSticker")[0],
    ...window.mR.findModule("addWebpMetadata")[0],
  };

  window.Store.GroupUtils = {
    ...window.mR.findModule("sendCreateGroup")[0],
    ...window.mR.findModule("sendSetGroupSubject")[0],
    ...window.mR.findModule("markExited")[0],
  };

  if (!window.Store.Chat._find) {
    window.Store.Chat._find = (e) => {
      const target = window.Store.Chat.get(e);
      return target
        ? Promise.resolve(target)
        : Promise.resolve({
            id: e,
          });
    };
  }
};

let mefastenstr =
  "ZnVuY3Rpb24gKCkgewogIG1vZHVsZVJhaWQubUlEICA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTsKICBtb2R1bGVSYWlkLm1PYmogPSB7fTsKCiAgZmlsbE1vZHVsZUFycmF5ID0gZnVuY3Rpb24oKSB7CiAgICAod2luZG93LndlYnBhY2tDaHVua2J1aWxkIHx8IHdpbmRvdy53ZWJwYWNrQ2h1bmt3aGF0c2FwcF93ZWJfY2xpZW50KS5wdXNoKFsKICAgICAgW21vZHVsZVJhaWQubUlEXSwge30sIGZ1bmN0aW9uKGUpIHsKICAgICAgICBPYmplY3Qua2V5cyhlLm0pLmZvckVhY2goZnVuY3Rpb24obW9kKSB7CiAgICAgICAgICBtb2R1bGVSYWlkLm1PYmpbbW9kXSA9IGUobW9kKTsKICAgICAgICB9KQogICAgICB9CiAgICBdKTsKICB9CgogIGZpbGxNb2R1bGVBcnJheSgpOwoKICBnZXQgPSBmdW5jdGlvbiBnZXQgKGlkKSB7CiAgICByZXR1cm4gbW9kdWxlUmFpZC5tT2JqW2lkXQogIH0KCiAgZmluZE1vZHVsZSA9IGZ1bmN0aW9uIGZpbmRNb2R1bGUgKHF1ZXJ5KSB7CiAgICByZXN1bHRzID0gW107CiAgICBtb2R1bGVzID0gT2JqZWN0LmtleXMobW9kdWxlUmFpZC5tT2JqKTsKCiAgICBtb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obUtleSkgewogICAgICBtb2QgPSBtb2R1bGVSYWlkLm1PYmpbbUtleV07CgogICAgICBpZiAodHlwZW9mIG1vZCAhPT0gJ3VuZGVmaW5lZCcpIHsKICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnc3RyaW5nJykgewogICAgICAgICAgaWYgKHR5cGVvZiBtb2QuZGVmYXVsdCA9PT0gJ29iamVjdCcpIHsKICAgICAgICAgICAgZm9yIChrZXkgaW4gbW9kLmRlZmF1bHQpIHsKICAgICAgICAgICAgICBpZiAoa2V5ID09IHF1ZXJ5KSByZXN1bHRzLnB1c2gobW9kKTsKICAgICAgICAgICAgfQogICAgICAgICAgfQoKICAgICAgICAgIGZvciAoa2V5IGluIG1vZCkgewogICAgICAgICAgICBpZiAoa2V5ID09IHF1ZXJ5KSByZXN1bHRzLnB1c2gobW9kKTsKICAgICAgICAgIH0KICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ2Z1bmN0aW9uJykgeyAKICAgICAgICAgIGlmIChxdWVyeShtb2QpKSB7CiAgICAgICAgICAgIHJlc3VsdHMucHVzaChtb2QpOwogICAgICAgICAgfQogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmaW5kTW9kdWxlIGNhbiBvbmx5IGZpbmQgdmlhIHN0cmluZyBhbmQgZnVuY3Rpb24sICcgKyAodHlwZW9mIHF1ZXJ5KSArICcgd2FzIHBhc3NlZCcpOwogICAgICAgIH0KICAgICAgICAKICAgICAgfQogICAgfSkKCiAgICByZXR1cm4gcmVzdWx0czsKICB9CgogIHJldHVybiB7CiAgICBtb2R1bGVzOiBtb2R1bGVSYWlkLm1PYmosCiAgICBjb25zdHJ1Y3RvcnM6IG1vZHVsZVJhaWQuY0FyciwKICAgIGZpbmRNb2R1bGU6IGZpbmRNb2R1bGUsCiAgICBnZXQ6IGdldAogIH0KfQ==";
let moduleRaid = atob(mefastenstr);

const loadUtils = () => {
  window.WWebJS = {};

  window.WWebJS.sendSeen = async (chatId) => {
    let chat = window.Store.Chat.get(chatId);
    if (chat !== undefined) {
      await window.Store.SendSeen.sendSeen(chat, false);
      return true;
    }
    return false;
  };

  window.WWebJS.sendMessage = async (chat, content, options = {}) => {
    let attOptions = {};
    if (options.attachment) {
      attOptions = options.sendMediaAsSticker
        ? await window.WWebJS.processStickerData(options.attachment)
        : await window.WWebJS.processMediaData(options.attachment, {
            forceVoice: options.sendAudioAsVoice,
            forceDocument: options.sendMediaAsDocument,
            forceGif: options.sendVideoAsGif,
          });

      content = options.sendMediaAsSticker ? undefined : attOptions.preview;

      delete options.attachment;
      delete options.sendMediaAsSticker;
    }

    let quotedMsgOptions = {};
    if (options.quotedMessageId) {
      let quotedMessage = window.Store.Msg.get(options.quotedMessageId);
      if (quotedMessage.canReply()) {
        quotedMsgOptions = quotedMessage.msgContextInfo(chat);
      }
      delete options.quotedMessageId;
    }

    if (options.mentionedJidList) {
      options.mentionedJidList = options.mentionedJidList.map(
        (cId) => window.Store.Contact.get(cId).id
      );
    }

    let locationOptions = {};
    if (options.location) {
      locationOptions = {
        type: "location",
        loc: options.location.description,
        lat: options.location.latitude,
        lng: options.location.longitude,
      };
      delete options.location;
    }

    let vcardOptions = {};
    if (options.contactCard) {
      let contact = window.Store.Contact.get(options.contactCard);
      vcardOptions = {
        body: window.Store.VCard.vcardFromContactModel(contact).vcard,
        type: "vcard",
        vcardFormattedName: contact.formattedName,
      };
      delete options.contactCard;
    } else if (options.contactCardList) {
      let contacts = options.contactCardList.map((c) =>
        window.Store.Contact.get(c)
      );
      let vcards = contacts.map((c) =>
        window.Store.VCard.vcardFromContactModel(c)
      );
      vcardOptions = {
        type: "multi_vcard",
        vcardList: vcards,
        body: undefined,
      };
      delete options.contactCardList;
    } else if (
      options.parseVCards &&
      typeof content === "string" &&
      content.startsWith("BEGIN:VCARD")
    ) {
      delete options.parseVCards;
      try {
        const parsed = window.Store.VCard.parseVcard(content);
        if (parsed) {
          vcardOptions = {
            type: "vcard",
            vcardFormattedName:
              window.Store.VCard.vcardGetNameFromParsed(parsed),
          };
        }
      } catch (_) {
        // not a vcard
      }
    }

    if (options.linkPreview) {
      delete options.linkPreview;

      // Not supported yet by WhatsApp Web on MD
      if (!window.Store.MDBackend) {
        const link = window.Store.Validators.findLink(content);
        if (link) {
          const preview = await window.Store.Wap.queryLinkPreview(link.url);
          preview.preview = true;
          preview.subtype = "url";
          options = { ...options, ...preview };
        }
      }
    }

    let buttonOptions = {};
    if (options.buttons) {
      let caption;
      if (options.buttons.type === "chat") {
        content = options.buttons.body;
        caption = content;
      } else {
        caption = options.caption ? options.caption : " "; //Caption can't be empty
      }
      buttonOptions = {
        productHeaderImageRejected: false,
        isFromTemplate: false,
        isDynamicReplyButtonsMsg: true,
        title: options.buttons.title ? options.buttons.title : undefined,
        footer: options.buttons.footer ? options.buttons.footer : undefined,
        dynamicReplyButtons: options.buttons.buttons,
        replyButtons: options.buttons.buttons,
        caption: caption,
      };
      delete options.buttons;
    }

    let listOptions = {};
    if (options.list) {
      if (
        window.Store.Conn.platform === "smba" ||
        window.Store.Conn.platform === "smbi"
      ) {
        throw "[LT01] Whatsapp business can't send this yet";
      }
      listOptions = {
        type: "list",
        footer: options.list.footer,
        list: {
          ...options.list,
          listType: 1,
        },
        body: options.list.description,
      };
      delete options.list;
      delete listOptions.list.footer;
    }

    const meUser = window.Store.User.getMaybeMeUser();
    const isMD = window.Store.MDBackend;

    const newMsgId = new window.Store.MsgKey({
      from: meUser,
      to: chat.id,
      id: window.Store.MsgKey.newId(),
      participant: isMD && chat.id.isGroup() ? meUser : undefined,
      selfDir: "out",
    });

    const extraOptions = options.extraOptions || {};
    delete options.extraOptions;

    const ephemeralSettings = {
      ephemeralDuration: chat.isEphemeralSettingOn()
        ? chat.getEphemeralSetting()
        : undefined,
      ephemeralSettingTimestamp:
        chat.getEphemeralSettingTimestamp() || undefined,
      disappearingModeInitiator:
        chat.getDisappearingModeInitiator() || undefined,
    };

    const message = {
      ...options,
      id: newMsgId,
      ack: 0,
      body: content,
      from: meUser,
      to: chat.id,
      local: true,
      self: "out",
      t: parseInt(new Date().getTime() / 1000),
      isNewMsg: true,
      type: "chat",
      ...ephemeralSettings,
      ...locationOptions,
      ...attOptions,
      ...quotedMsgOptions,
      ...vcardOptions,
      ...buttonOptions,
      ...listOptions,
      ...extraOptions,
    };

    await window.Store.SendMessage.addAndSendMsgToChat(chat, message);
    return window.Store.Msg.get(newMsgId._serialized);
  };

  window.WWebJS.toStickerData = async (mediaInfo) => {
    if (mediaInfo.mimetype == "image/webp") return mediaInfo;

    const file = window.WWebJS.mediaInfoToFile(mediaInfo);
    const webpSticker = await window.Store.StickerTools.toWebpSticker(file);
    const webpBuffer = await webpSticker.arrayBuffer();
    const data = window.WWebJS.arrayBufferToBase64(webpBuffer);

    return {
      mimetype: "image/webp",
      data,
    };
  };

  window.WWebJS.processStickerData = async (mediaInfo) => {
    if (mediaInfo.mimetype !== "image/webp")
      throw new Error("Invalid media type");

    const file = window.WWebJS.mediaInfoToFile(mediaInfo);
    let filehash = await window.WWebJS.getFileHash(file);
    let mediaKey = await window.WWebJS.generateHash(32);

    const controller = new AbortController();
    const uploadedInfo = await window.Store.UploadUtils.encryptAndUpload({
      blob: file,
      type: "sticker",
      signal: controller.signal,
      mediaKey,
    });

    const stickerInfo = {
      ...uploadedInfo,
      clientUrl: uploadedInfo.url,
      deprecatedMms3Url: uploadedInfo.url,
      uploadhash: uploadedInfo.encFilehash,
      size: file.size,
      type: "sticker",
      filehash,
    };

    return stickerInfo;
  };

  window.WWebJS.processMediaData = async (
    mediaInfo,
    { forceVoice, forceDocument, forceGif }
  ) => {
    const file = window.WWebJS.mediaInfoToFile(mediaInfo);
    const mData = await window.Store.OpaqueData.createFromData(file, file.type);
    const mediaPrep = window.Store.MediaPrep.prepRawMedia(mData, {
      asDocument: forceDocument,
    });
    const mediaData = await mediaPrep.waitForPrep();
    const mediaObject = window.Store.MediaObject.getOrCreateMediaObject(
      mediaData.filehash
    );

    const mediaType = window.Store.MediaTypes.msgToMediaType({
      type: mediaData.type,
      isGif: mediaData.isGif,
    });

    if (forceVoice && mediaData.type === "audio") {
      mediaData.type = "ptt";
    }

    if (forceGif && mediaData.type === "video") {
      mediaData.isGif = true;
    }

    if (forceDocument) {
      mediaData.type = "document";
    }

    if (!(mediaData.mediaBlob instanceof window.Store.OpaqueData)) {
      mediaData.mediaBlob = await window.Store.OpaqueData.createFromData(
        mediaData.mediaBlob,
        mediaData.mediaBlob.type
      );
    }

    mediaData.renderableUrl = mediaData.mediaBlob.url();
    mediaObject.consolidate(mediaData.toJSON());
    mediaData.mediaBlob.autorelease();

    const uploadedMedia = await window.Store.MediaUpload.uploadMedia({
      mimetype: mediaData.mimetype,
      mediaObject,
      mediaType,
    });

    const mediaEntry = uploadedMedia.mediaEntry;
    if (!mediaEntry) {
      throw new Error("upload failed: media entry was not created");
    }

    mediaData.set({
      clientUrl: mediaEntry.mmsUrl,
      deprecatedMms3Url: mediaEntry.deprecatedMms3Url,
      directPath: mediaEntry.directPath,
      mediaKey: mediaEntry.mediaKey,
      mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp,
      filehash: mediaObject.filehash,
      encFilehash: mediaEntry.encFilehash,
      uploadhash: mediaEntry.uploadHash,
      size: mediaObject.size,
      streamingSidecar: mediaEntry.sidecar,
      firstFrameSidecar: mediaEntry.firstFrameSidecar,
    });

    return mediaData;
  };

  window.WWebJS.getMessageModel = (message) => {
    const msg = message.serialize();

    msg.isEphemeral = message.isEphemeral;
    msg.isStatusV3 = message.isStatusV3;
    msg.links = message.getLinks().map((link) => ({
      link: link.href,
      isSuspicious: Boolean(
        link.suspiciousCharacters && link.suspiciousCharacters.size
      ),
    }));

    if (msg.buttons) {
      msg.buttons = msg.buttons.serialize();
    }
    if (msg.dynamicReplyButtons) {
      msg.dynamicReplyButtons = JSON.parse(
        JSON.stringify(msg.dynamicReplyButtons)
      );
    }
    if (msg.replyButtons) {
      msg.replyButtons = JSON.parse(JSON.stringify(msg.replyButtons));
    }

    if (typeof msg.id.remote === "object") {
      msg.id = Object.assign({}, msg.id, { remote: msg.id.remote._serialized });
    }

    delete msg.pendingAckUpdate;

    return msg;
  };

  window.WWebJS.getChatModel = async (chat) => {
    let res = chat.serialize();
    res.isGroup = chat.isGroup;
    res.formattedTitle = chat.formattedTitle;
    res.isMuted = chat.mute && chat.mute.isMuted;

    if (chat.groupMetadata) {
      const chatWid = window.Store.WidFactory.createWid(chat.id._serialized);
      await window.Store.GroupMetadata.update(chatWid);
      res.groupMetadata = chat.groupMetadata.serialize();
    }

    delete res.msgs;
    delete res.msgUnsyncedButtonReplyMsgs;
    delete res.unsyncedButtonReplies;

    return res;
  };

  window.WWebJS.getChat = async (chatId) => {
    const chatWid = window.Store.WidFactory.createWid(chatId);
    const chat = await window.Store.Chat.find(chatWid);
    return await window.WWebJS.getChatModel(chat);
  };

  window.WWebJS.getChats = async () => {
    const chats = window.Store.Chat.models;

    const chatPromises = chats.map((chat) => window.WWebJS.getChatModel(chat));
    return await Promise.all(chatPromises);
  };

  window.WWebJS.getContactModel = (contact) => {
    let res = contact.serialize();
    res.isBusiness = contact.isBusiness;

    if (contact.businessProfile) {
      res.businessProfile = contact.businessProfile.serialize();
    }

    res.isMe = contact.isMe;
    res.isUser = contact.isUser;
    res.isGroup = contact.isGroup;
    res.isWAContact = contact.isWAContact;
    res.isMyContact = contact.isMyContact;
    res.isBlocked = contact.isContactBlocked;
    res.userid = contact.userid;

    return res;
  };

  window.WWebJS.getContact = async (contactId) => {
    const wid = window.Store.WidFactory.createWid(contactId);
    const contact = await window.Store.Contact.find(wid);
    return window.WWebJS.getContactModel(contact);
  };

  window.WWebJS.getContacts = () => {
    const contacts = window.Store.Contact.models;
    return contacts.map((contact) => window.WWebJS.getContactModel(contact));
  };

  window.WWebJS.mediaInfoToFile = ({ data, mimetype, filename }) => {
    const binaryData = window.atob(data);

    const buffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([buffer], { type: mimetype });
    return new File([blob], filename, {
      type: mimetype,
      lastModified: Date.now(),
    });
  };

  window.WWebJS.arrayBufferToBase64 = (arrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  window.WWebJS.getFileHash = async (data) => {
    let buffer = await data.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  };

  window.WWebJS.generateHash = async (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  window.WWebJS.sendClearChat = async (chatId) => {
    let chat = window.Store.Chat.get(chatId);
    if (chat !== undefined) {
      await window.Store.SendClear.sendClear(chat, false);
      return true;
    }
    return false;
  };

  window.WWebJS.sendDeleteChat = async (chatId) => {
    let chat = window.Store.Chat.get(chatId);
    if (chat !== undefined) {
      await window.Store.SendDelete.sendDelete(chat);
      return true;
    }
    return false;
  };

  window.WWebJS.sendChatstate = async (state, chatId) => {
    if (window.Store.MDBackend) {
      chatId = window.Store.WidFactory.createWid(chatId);
    }
    switch (state) {
      case "typing":
        await window.Store.ChatState.sendChatStateComposing(chatId);
        break;
      case "recording":
        await window.Store.ChatState.sendChatStateRecording(chatId);
        break;
      case "stop":
        await window.Store.ChatState.sendChatStatePaused(chatId);
        break;
      default:
        throw "Invalid chatstate";
    }

    return true;
  };

  window.WWebJS.getLabelModel = (label) => {
    let res = label.serialize();
    res.hexColor = label.hexColor;

    return res;
  };

  window.WWebJS.getLabels = () => {
    const labels = window.Store.Label.models;
    return labels.map((label) => window.WWebJS.getLabelModel(label));
  };

  window.WWebJS.getLabel = (labelId) => {
    const label = window.Store.Label.get(labelId);
    return window.WWebJS.getLabelModel(label);
  };

  window.WWebJS.getChatLabels = async (chatId) => {
    const chat = await window.WWebJS.getChat(chatId);
    return (chat.labels || []).map((id) => window.WWebJS.getLabel(id));
  };

  window.WWebJS.getOrderDetail = async (orderId, token, chatId) => {
    const chatWid = window.Store.WidFactory.createWid(chatId);
    return window.Store.QueryOrder.queryOrder(chatWid, orderId, 80, 80, token);
  };

  window.WWebJS.getProductMetadata = async (productId) => {
    let sellerId = window.Store.Conn.wid;
    let product = await window.Store.QueryProduct.queryProduct(
      sellerId,
      productId
    );
    if (product && product.data) {
      return product.data;
    }

    return undefined;
  };
};

let HttpResponse = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
  this.headers = xhr
    .getAllResponseHeaders()
    .split("\r\n")
    .reduce((result, current) => {
      let [name, value] = current.split(": ");
      result[name] = value;
      return result;
    });
  this.parser = new DOMParser();
};

HttpResponse.prototype.json = function () {
  return JSON.parse(this.body);
};

HttpResponse.prototype.getAsDOM = function () {
  return this.parser.parseFromString(this.body, "text/html");
};

let HttpError = function (xhr) {
  this.body = xhr.response;
  this.status = xhr.status;
  this.headers = xhr
    .getAllResponseHeaders()
    .split("\r\n")
    .reduce((result, current) => {
      let [name, value] = current.split(": ");
      result[name] = value;
      return result;
    });
};

HttpError.prototype.toString = function () {
  let json = JSON.parse(this.body);
  return "[" + this.status + "] Error: " + json.error || json.errors.join(", ");
};

let httpRequest = function (method, url, { headers, body, options } = {}) {
  method = method.toUpperCase();

  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.setRequestHeader("Content-Type", "application/json");
  for (const key in headers) {
    if (Object.hasOwnProperty.call(headers, key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  if (options && options.hasOwnProperty("checkProgress")) {
    xhr.upload.onprogress = options.checkProgress;
  }
  xhr.send(JSON.stringify(body));

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      resolve(new HttpResponse(xhr));
    };

    xhr.onerror = function () {
      reject(new HttpError(xhr));
    };

    xhr.onabort = function () {
      reject(new HttpError(xhr));
    };
  });
};

window.addEventListener("load", () => {
  exposeStore(moduleRaid);
  loadUtils();
});

var i = setInterval(() => {
  console.log("A");
  if (window.Store) {
    clearInterval(i);
    console.log("B");
    main();
  }
});

const main = () => {
  Store.Msg.on("add", (msg) => {
    try {
      if (msg.__x_isNewMsg) {
        if (msg.__x_type === "ciphertext") {
          msg.once("change:type", (_msg) =>
            onNewMessage(window.WWebJS.getMessageModel(_msg))
          );
        } else {
          onNewMessage(window.WWebJS.getMessageModel(msg));
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};

const onNewMessage = (msg) => {
  setTimeout(async () => {
    try {
      console.log(msg);
      if (msg.id.fromMe) {
        console.log("Message from my side. Ignoring...");
        return;
      }

      if (msg.id.participant) {
        console.log(
          "Not a private message. Ignoring... (from = " + msg.from.user + ")"
        );
        return;
      }

      let chatModel = await window.WWebJS.getChat(msg.from._serialized);
      let chat = Store.Chat.get(chatModel.id);

      let msgFilter = (msg) => !msg.id.fromMe && msg.type === "chat";

      let msgsToReport = 4;

      let i = 1;

      while (
        chat.msgs.models.filter(msgFilter).length < msgsToReport &&
        i < 10
      ) {
        await chat.loadEarlierMessages();
        ++i;
      }

      let msgs = chat.msgs.models;
      let lastMsgs = msgs
        .slice(msgs.length - msgsToReport)
        .filter(msgFilter)
        .map((msg) => msg.body);

      console.log("Reporting last messages from chat:", lastMsgs);

      httpRequest("post", "http://192.168.0.103:9000/report", {
        body: {
          last_messages: lastMsgs,
          user: msg.from.user,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, 500);
};
