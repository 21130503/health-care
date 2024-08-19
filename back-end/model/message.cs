public class Message
{
    public int id { get; set; }
    public int topicId { get; set; }
    public int from { get; set; }
    public string message { get; set; }
    public DateTime createdAt { get; set; }
}