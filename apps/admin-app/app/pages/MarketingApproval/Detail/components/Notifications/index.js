import { Collapse, Skeleton } from 'antd';

import { Space, TextArea, TextInput } from '@shared/components/GUI';

const Notifications = ({
  values,
  setFieldValue,
  isGeneratedContentPending,
}) => {
  const { notifications } = values;

  if (!notifications) return false;

  const handleSelection = (segmentID, language, subId) => {
    const selected = notifications[segmentID].contents[language].map(item => {
      if (item.subId === subId) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return {
        ...item,
        isSelected: false,
      };
    });
    setFieldValue(`notifications[${segmentID}].contents[${language}]`, selected);
  };

  return (
    isGeneratedContentPending ? <Skeleton active /> : (
      <Space>
        <Collapse>
          {
            Object.entries(notifications).map((notification, index) => (
              <Collapse.Panel header={`Segment ${index + 1}: ${notification[1].clusterTags.join(', ')}`} key={notification[0]}>
                <div className="d-flex w-100">
                  {
                    Object.entries(notification[1]?.contents).map(content => (
                      <div key={content[0]} className="w-100">
                        <p>{content[0]}</p>
                        <div className="d-flex flex-wrap py-4">
                          {content[1].map((item, subIndex) => (
                            <button
                              type="button"
                              key={item.subID}
                              className="w-50 p-2 b"
                              style={item.isSelected ? { border: '2px solid green' } : { border: 'none' }}
                              onClick={() => handleSelection(notification[0], content[0], item.subId)}
                            >
                              <TextInput
                                label="Title"
                                value={item.title}
                                onChange={e => {
                                  setFieldValue(`notifications[${notification[0]}].contents[${content[0]}][${subIndex}].title`, e.target.value);
                                }}
                              />
                              <TextArea
                                className="mt-2"
                                value={item.message}
                                onChange={e => {
                                  setFieldValue(`notifications[${notification[0]}].contents[${content[0]}][${subIndex}].message`, e.target.value);
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </Collapse.Panel>
            ))
          }
        </Collapse>
      </Space>
    )

  );
};

export default Notifications;
