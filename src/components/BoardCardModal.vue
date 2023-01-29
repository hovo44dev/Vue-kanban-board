<script setup>
import ModalWrapper from "./UI/ModalWrapper.vue";
import Avatar from "./UI/Avatar.vue";
</script>

<template>
  <ModalWrapper>
    <div class="card-popup">
      <button class="card-popup_close">
        <img src="../assets/icons/cross.svg" alt="close" />
      </button>
      <div class="card-popup-header">
        <div class="card-popup-header-icon">
          <img src="../assets/icons/textbook.svg" alt="book" />
        </div>
        <div class="card-popup-header-body">
          <textarea class="card-popup-header-body-title" value="adsf" />
          <p class="card-popup-header-body-column-name">
            in List <span>done</span>
          </p>
        </div>
      </div>
      <div class="card-popup-inner">
        <div class="card-popup-inner-description">
          <div class="card-popup-inner-description-icon">
            <img src="../assets/icons/align-left.svg" alt="align-left" />
          </div>
          <div class="card-popup-inner-description-body">
            <p class="card-popup-inner-description-body-title">Description</p>
            <textarea
              placeholder="Add a more detailed description..."
              class="card-popup-inner-description-body-area"
            ></textarea>
          </div>
        </div>
        <div class="card-popup-inner-actions">
          <h4 class="card-popup-inner-actions-title">Actions</h4>
          <div class="card-popup-inner-actions-items">
            <div class="item">
              <div class="icon">
                <img src="../assets/icons/trash.svg" alt="delete" />
              </div>
              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-popup-activity">
        <div class="card-popup-activity-header">
          <div class="card-popup-activity-header-icon">
            <img src="../assets/icons/activity.svg" alt="align-left" />
          </div>
          <p class="card-popup-activity-header-title">Activity</p>
        </div>
        <div class="card-popup-activity-body">
          <Avatar title="Narek" />
          <h3 class="card-popup-activity-body-description">
            Narek <span>an hour ago</span>
          </h3>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.card-popup {
  width: 768px;
  max-width: 100%;
  margin: 48px auto 80px;
  border-radius: 3px;
  background-color: #f4f5f7;
  position: relative;
  padding: 16px;
  &_close {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin: 4px;
    padding: 4px;
    transition: background-color 0.3s;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #091e4214;
    }
    img {
      width: 16px;
    }
  }
  &-header {
    display: flex;
    padding-right: 56px;
    &-icon {
      width: 32px;
      height: 32px;
      display: flex;
      img {
        width: 24px;
      }
    }
    &-body {
      width: 100%;
      &-title {
        width: 100%;
        height: 32px;
        overflow-wrap: break-word;
        border: none;
        resize: none;
        background-color: unset;
        min-height: 24px;
        padding: 4px 8px;
        font-weight: 600;
        font-size: 1.25rem;
        border-radius: 3px;
        &:focus {
          outline: none;
          box-shadow: inset 0 0 0 2px#0079bf;
        }
      }
      &-column-name {
        color: #5e6c84;
        font-size: 0.875rem;
        padding-left: 8px;
        span {
          text-decoration: underline;
        }
      }
    }
  }
  &-inner {
    display: flex;
    margin-top: 30px;
    width: 100%;
    justify-content: space-between;
    &-description {
      display: flex;
      flex: 1;
      margin-top: 20px;
      padding-right: 10px;
      &-icon {
        width: 32px;
        height: 32px;
        display: flex;
        img {
          width: 24px;
          height: 24px;
        }
      }
      &-body {
        width: 100%;
        margin-top: 3px;
        &-title {
          padding-left: 8px;
        }
        &-area {
          width: 100%;
          resize: none;
          height: 56px;
          background-color: #091e420a;
          border-radius: 3px;
          padding: 8px 12px;
          outline: none;
          border: none;
          margin-top: 20px;
        }
      }
    }
    &-actions {
      padding: 0 0 8px 8px;
      width: 200px;
      &-items {
        margin-top: 10px;
      }
      .item {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        border-radius: 3px;
        padding: 6px 12px;
        background-color: #091e420a;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: #091e4214;
        }
        .icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
  &-activity {
    margin-top: 40px;
    &-header {
      display: flex;
      align-items: center;
      &-icon {
        width: 32px;
        height: 32px;
        display: flex;
        img {
          width: 24px;
        }
      }
      &-title {
        padding-left: 8px;
      }
    }
    &-body {
      margin-top: 15px;
      display: flex;
      align-items: center;
      &-description {
        margin-left: 10px;
        font-weight: 600;
        span {
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
